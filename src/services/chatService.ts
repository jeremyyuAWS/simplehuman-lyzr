import { Message, ConversationContext } from '../types';

interface ChatInferenceResponse {
  message: {
    text: string;
    rich_content?: Array<{
      type: string;
      title: string;
      subtitle: string;
      image_url: string;
      buttons: Array<{
        label: string;
        action: string;
        url?: string;
        metadata?: Record<string, any>;
      }>;
    }>;
    suggestions?: Array<{
      label: string;
      action: string;
    }>;
  };
  context: {
    customer_intent: string;
    category?: string;
    refurbishment_interest?: boolean;
  };
}

export const callChatInference = async (
  message: string,
  context: ConversationContext = {} as ConversationContext
): Promise<any> => {
  try {
    // Construct the URL for the Supabase Edge Function
    const apiUrl = 'https://opgiszqogqvedfcvvuvj.supabase.co/functions/v1/chat-inference';
    
    // Prepare the request payload
    const payload = {
      message,
      context: {
        userIntents: context.userIntents,
        productInterests: context.productInterests,
        roomTypes: context.roomTypes,
        features: context.features,
        issues: context.issues,
        conversationStage: context.conversationStage,
      }
    };

    // Make the API call
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add CORS headers to allow the request
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: ChatInferenceResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error calling chat inference:', error);
    throw new Error(`Error calling chat inference:\n\n${error instanceof Error ? error.message : String(error)}`);
  }
};

// Helper function to convert the Lyzr response to our internal Message format
export const convertApiResponseToMessage = (lyzrResponse: ChatInferenceResponse): Message => {
  // Basic text response
  if (!lyzrResponse.message.rich_content || lyzrResponse.message.rich_content.length === 0) {
    return {
      sender: 'bot',
      content: lyzrResponse.message.text,
      timestamp: new Date(),
      type: 'text'
    };
  }

  // If we have rich content, convert it to product recommendations
  if (lyzrResponse.message.rich_content.some(content => content.type === 'card')) {
    return {
      sender: 'bot',
      content: {
        introText: lyzrResponse.message.text,
        products: lyzrResponse.message.rich_content
          .filter(content => content.type === 'card')
          .map(card => ({
            id: card.buttons.find(btn => btn.metadata?.product_id)?.metadata?.product_id || `product-${Math.random().toString(36).substring(2, 9)}`,
            name: card.title,
            description: card.subtitle,
            price: 0, // Price not provided in the response
            imageUrl: card.image_url || 'https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            category: lyzrResponse.context.category || 'unknown',
            features: [], // Features not provided in the response
          }))
      },
      timestamp: new Date(),
      type: 'product-recommendation'
    };
  }

  // Default fallback
  return {
    sender: 'bot',
    content: lyzrResponse.message.text,
    timestamp: new Date(),
    type: 'text'
  };
};

// For backward compatibility, keep the old function name as an alias
export const convertLyzrResponseToMessage = convertApiResponseToMessage;