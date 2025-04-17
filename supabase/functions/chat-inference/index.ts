// Follow Deno Deploy's ES modules URLs convention
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatRequest {
  message: string;
  history: ChatMessage[];
  user_info?: {
    user_id?: string;
    preferences?: {
      room_type?: string[];
      product_interest?: string[];
    };
  };
}

interface ProductCard {
  type: string;
  title: string;
  subtitle: string;
  image_url: string;
  buttons?: Array<{
    label: string;
    action: string;
    url?: string;
    metadata?: Record<string, any>;
  }>;
}

interface ChatResponse {
  message: {
    text: string;
    rich_content?: ProductCard[];
    suggestions?: Array<{
      label: string;
      action: string;
    }>;
  };
  context: {
    customer_intent?: string;
    category?: string;
    refurbishment_interest?: boolean;
    [key: string]: any;
  };
}

// Mock product data to use in responses
const mockProducts = {
  trash_cans: [
    {
      id: 'tc-01',
      name: '45L Rectangular Sensor Can',
      description: 'Voice & Motion Control with Liner Pocket',
      price: 199.99,
      image_url: '/images/Butterfly Step Can.webp',
      category: 'trash_can',
      features: ['Voice Control', 'Motion Sensor', 'Liner Pocket'],
    },
    {
      id: 'tc-02',
      name: '58L Dual Compartment Sensor Can',
      description: 'Separate compartments for trash and recycling',
      price: 229.99,
      image_url: '/images/simplehuman 58 Liter : 15.3 Gallon Rectangular Hands-Free Dual Compartment Recycling Kitchen Step Trash Can with Soft-Close Lid.jpg',
      category: 'trash_can',
      features: ['Dual Compartment', 'Motion Sensor', 'Liner Pocket'],
    },
  ],
  soap_dispensers: [
    {
      id: 'sd-01',
      name: 'Rechargeable Sensor Pump',
      description: 'Touchless foaming soap dispenser',
      price: 79.99,
      image_url: '/images/simplehuman 9 oz. Touch-Free Automatic Rechargeable Sensor Pump.jpg',
      category: 'soap_dispenser',
      features: ['Sensor', 'Rechargeable', 'Foaming'],
    },
    {
      id: 'sd-02',
      name: 'Touch-Free Sensor Pump',
      description: 'Battery-powered liquid soap dispenser',
      price: 59.99,
      image_url: '/images/Liquid Sensor Pump.webp',
      category: 'soap_dispenser',
      features: ['Sensor', 'Battery-Powered', 'Liquid'],
    },
  ],
  paper_towel_holders: [
    {
      id: 'pt-04',
      name: 'Standing Paper Towel Holder with Spray Pump',
      description: 'Integrated spray pump for cleaning solutions',
      price: 49.99,
      image_url: '/images/simplehuman Standing Paper Towel Holder with Spray Pump.jpg',
      category: 'paper_towel',
      features: ['Spray Pump', 'Stable Base', 'Easy Tear'],
    },
  ]
};

// Simple intent classification
function classifyIntent(message: string): string {
  const lowerMsg = message.toLowerCase();
  
  if (lowerMsg.includes('trash') || lowerMsg.includes('garbage') || lowerMsg.includes('bin')) {
    return 'product_search';
  }
  
  if (lowerMsg.includes('soap') || lowerMsg.includes('dispenser')) {
    return 'product_search';
  }
  
  if (lowerMsg.includes('paper') || lowerMsg.includes('towel')) {
    return 'product_search';
  }
  
  if (lowerMsg.includes('warranty') || lowerMsg.includes('register')) {
    return 'warranty';
  }
  
  if (lowerMsg.includes('order') || lowerMsg.includes('track')) {
    return 'order_status';
  }

  if (lowerMsg.includes('return') || lowerMsg.includes('refund')) {
    return 'return';
  }

  if (lowerMsg.includes('broken') || lowerMsg.includes('not working') || lowerMsg.includes('issue')) {
    return 'troubleshooting';
  }

  if (lowerMsg.includes('refurbished')) {
    return 'refurbished_product';
  }
  
  return 'general_inquiry';
}

// Detect product category from message
function detectCategory(message: string): string | null {
  const lowerMsg = message.toLowerCase();
  
  if (lowerMsg.includes('trash') || lowerMsg.includes('garbage') || lowerMsg.includes('bin')) {
    return 'trash_cans';
  }
  
  if (lowerMsg.includes('soap') || lowerMsg.includes('dispenser')) {
    return 'soap_dispensers';
  }
  
  if (lowerMsg.includes('paper') || lowerMsg.includes('towel')) {
    return 'paper_towel_holders';
  }
  
  return null;
}

// Generate a response based on intent and message content
function generateResponse(request: ChatRequest): ChatResponse {
  const message = request.message;
  const history = request.history || [];
  const intent = classifyIntent(message);
  const category = detectCategory(message);
  let refurbishmentInterest = false;
  
  // Check for refurbishment interest
  if (message.toLowerCase().includes('refurbished') || message.toLowerCase().includes('discount')) {
    refurbishmentInterest = true;
  }
  
  // Build response based on intent
  let responseText = '';
  let richContent = [];
  let suggestions = [];
  
  switch(intent) {
    case 'product_search':
      if (category) {
        responseText = `Thanks for your interest! Here are some of our popular ${category.replace('_', ' ')}:`;
        richContent = (mockProducts[category as keyof typeof mockProducts] || []).slice(0, 2).map(product => ({
          type: 'card',
          title: product.name,
          subtitle: product.description,
          image_url: product.image_url,
          buttons: [
            {
              label: 'View Product',
              action: 'open_url',
              url: `#${product.id}`
            },
            {
              label: 'See Refurbished Options',
              action: 'trigger_refurbished_flow',
              metadata: {
                product_id: product.id
              }
            }
          ]
        }));
        
        suggestions = [
          {
            label: 'Compare Products',
            action: 'trigger_comparison'
          },
          {
            label: 'See More Options',
            action: 'show_more_products'
          }
        ];
      } else {
        responseText = "I'd be happy to help you find the perfect Simplehuman product. What type are you interested in? We have trash cans, soap dispensers, paper towel holders, and more.";
        suggestions = [
          {
            label: 'Trash Cans',
            action: 'show_trash_cans'
          },
          {
            label: 'Soap Dispensers',
            action: 'show_soap_dispensers'
          },
          {
            label: 'Paper Towel Holders',
            action: 'show_paper_towel_holders'
          }
        ];
      }
      break;
      
    case 'warranty':
      responseText = "I can help you with warranty registration for your Simplehuman product. Could you tell me which product you'd like to register or check warranty status for?";
      suggestions = [
        {
          label: 'Register New Product',
          action: 'trigger_warranty_registration'
        },
        {
          label: 'Check Warranty Status',
          action: 'check_warranty_status'
        }
      ];
      break;
      
    case 'order_status':
      responseText = "I'd be happy to help you track your order. Could you provide your order number? It should look like SH followed by 6 digits.";
      suggestions = [
        {
          label: 'View All Orders',
          action: 'show_all_orders'
        },
        {
          label: 'Contact Support',
          action: 'contact_support'
        }
      ];
      break;
      
    case 'return':
      responseText = "I can help you process a return. Our return policy allows returns within 90 days of purchase. Would you like to start a return process or check your return eligibility?";
      suggestions = [
        {
          label: 'Start Return Process',
          action: 'start_return'
        },
        {
          label: 'Check Return Eligibility',
          action: 'check_return_eligibility'
        }
      ];
      break;
      
    case 'troubleshooting':
      responseText = "I'm sorry to hear you're having issues. To help troubleshoot, could you tell me which Simplehuman product you're having trouble with and what specific problem you're experiencing?";
      suggestions = [
        {
          label: 'Trash Can Issue',
          action: 'troubleshoot_trash_can'
        },
        {
          label: 'Soap Dispenser Issue',
          action: 'troubleshoot_soap_dispenser'
        }
      ];
      break;
      
    case 'refurbished_product':
      responseText = "We do offer certified refurbished products at a discount! These products undergo thorough testing and come with a 1-year warranty. They may have minor cosmetic imperfections but are guaranteed to function like new.";
      if (category) {
        richContent = (mockProducts[category as keyof typeof mockProducts] || []).slice(0, 1).map(product => {
          const refurbishedPrice = (product.price * 0.7).toFixed(2); // 30% discount
          return {
            type: 'card',
            title: `Refurbished ${product.name}`,
            subtitle: `${product.description} - Save $${(product.price - parseFloat(refurbishedPrice)).toFixed(2)}`,
            image_url: product.image_url,
            buttons: [
              {
                label: `Buy Now: $${refurbishedPrice}`,
                action: 'open_url',
                url: `#refurbished-${product.id}`
              }
            ]
          };
        });
        
        suggestions = [
          {
            label: 'See All Refurbished Items',
            action: 'browse_refurbished'
          },
          {
            label: 'Refurbished vs New',
            action: 'compare_refurbished_new'
          }
        ];
      }
      break;
      
    default:
      responseText = "Welcome to Simplehuman! I'm your smart assistant. I can help you find the perfect products for your home, provide troubleshooting assistance, track orders, or help with warranty registration. What brings you here today?";
      suggestions = [
        {
          label: 'Shop Products',
          action: 'browse_products'
        },
        {
          label: 'Track My Order',
          action: 'track_order'
        },
        {
          label: 'Get Support',
          action: 'get_support'
        }
      ];
  }
  
  return {
    message: {
      text: responseText,
      rich_content: richContent.length > 0 ? richContent : undefined,
      suggestions: suggestions.length > 0 ? suggestions : undefined
    },
    context: {
      customer_intent: intent,
      category: category,
      refurbishment_interest: refurbishmentInterest
    }
  };
}

serve(async (req) => {
  // Handle CORS for local development
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  try {
    const data = await req.json();
    
    // Validate input
    if (!data.message) {
      throw new Error("Message is required");
    }
    
    // Process request
    const response = generateResponse(data);

    return new Response(
      JSON.stringify(response),
      { 
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        } 
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ 
        error: error.message || "An unexpected error occurred", 
        message: {
          text: "I'm sorry, I encountered an error processing your request. Please try again."
        },
        context: {
          customer_intent: "error"
        }
      }),
      { 
        status: 400,
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        } 
      }
    );
  }
});