import { useState, useEffect, useCallback } from 'react';
import { Message, Product, ProductOption } from '../types';
import { mockProducts } from '../data/mockProducts';
import { regularUserOrders } from '../data/mockOrders';

// Helper to create a delay for simulating typing
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const useConversation = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  // Initialize conversation
  useEffect(() => {
    const initConversation = async () => {
      setIsTyping(true);
      await delay(1000);
      
      const initialMessage: Message = {
        sender: 'bot',
        content: 'Hello! I\'m the Simplehuman Smart Assistant. What brings you here today? Looking for a trash can, soap dispenser, mirror, or something else?',
        timestamp: new Date(),
        type: 'text'
      };
      
      setMessages([initialMessage]);
      setIsTyping(false);
    };
    
    initConversation();
  }, []);

  // Process user message and generate a response
  const processMessage = useCallback(async (userMessage: string) => {
    setIsTyping(true);
    
    // Simulate processing delay
    await delay(1000 + Math.random() * 1000);
    
    let botResponse: Message;
    
    // Simple keyword matching for demo purposes
    const lowerCaseMessage = userMessage.toLowerCase();
    
    if (
      lowerCaseMessage.includes('trash') || 
      lowerCaseMessage.includes('can') || 
      lowerCaseMessage.includes('garbage') ||
      lowerCaseMessage.includes('bin')
    ) {
      // Product finder flow for trash cans
      botResponse = {
        sender: 'bot',
        content: {
          question: 'Great! I can help you find the perfect trash can. Where will you be using it?',
          options: [
            { label: 'Kitchen', value: 'kitchen', onClick: () => handleRoomSelection('kitchen', 'trash-can') },
            { label: 'Bathroom', value: 'bathroom', onClick: () => handleRoomSelection('bathroom', 'trash-can') },
            { label: 'Office', value: 'office', onClick: () => handleRoomSelection('office', 'trash-can') },
            { label: 'Other', value: 'other', onClick: () => handleRoomSelection('other', 'trash-can') }
          ]
        },
        timestamp: new Date(),
        type: 'product-options'
      };
    } else if (
      lowerCaseMessage.includes('soap') || 
      lowerCaseMessage.includes('dispenser')
    ) {
      // Product finder flow for soap dispensers
      botResponse = {
        sender: 'bot',
        content: {
          question: 'I can help you find a soap dispenser. What type are you interested in?',
          options: [
            { label: 'Touchless/Sensor', value: 'sensor', onClick: () => handleDispenserSelection('sensor') },
            { label: 'Rechargeable', value: 'rechargeable', onClick: () => handleDispenserSelection('rechargeable') },
            { label: 'Foaming', value: 'foaming', onClick: () => handleDispenserSelection('foaming') },
            { label: 'Any Type', value: 'any', onClick: () => handleDispenserSelection('any') }
          ]
        },
        timestamp: new Date(),
        type: 'product-options'
      };
    } else if (
      lowerCaseMessage.includes('mirror') ||
      lowerCaseMessage.includes('makeup')
    ) {
      // Product finder flow for mirrors
      botResponse = {
        sender: 'bot',
        content: {
          question: 'Our mirrors are perfect for your grooming routine. What features are you looking for?',
          options: [
            { label: 'With Lighting', value: 'lighting', onClick: () => handleMirrorSelection('lighting') },
            { label: 'With Magnification', value: 'magnification', onClick: () => handleMirrorSelection('magnification') },
            { label: 'Smart Features', value: 'smart', onClick: () => handleMirrorSelection('smart') },
            { label: 'All Options', value: 'all', onClick: () => handleMirrorSelection('all') }
          ]
        },
        timestamp: new Date(),
        type: 'product-options'
      };
    } else if (
      lowerCaseMessage.includes('track') && 
      lowerCaseMessage.includes('order')
    ) {
      // Order tracking flow
      botResponse = {
        sender: 'bot',
        content: {
          introText: 'I found your recent order:',
          order: regularUserOrders[0] // Using first mock order for demo
        },
        timestamp: new Date(),
        type: 'order-tracking'
      };
    } else if (
      lowerCaseMessage.includes('not working') || 
      lowerCaseMessage.includes('broken') || 
      lowerCaseMessage.includes('issue') ||
      lowerCaseMessage.includes('problem') ||
      lowerCaseMessage.includes('help')
    ) {
      // Troubleshooting flows
      if (lowerCaseMessage.includes('soap') || lowerCaseMessage.includes('dispenser')) {
        botResponse = {
          sender: 'bot',
          content: {
            introText: 'I\'m sorry to hear you\'re having trouble with your soap dispenser. Let\'s troubleshoot:',
            steps: [
              'Check if the dispenser has enough soap. The dispenser won\'t work if it\'s empty.',
              'Make sure the dispenser is charged or has fresh batteries.',
              'Clean the sensor area with a soft, dry cloth.',
              'Try resetting the dispenser by holding the power button for 10 seconds.'
            ],
            additionalHelp: 'If the issue persists, you may need more detailed support.',
            supportLink: '#'
          },
          timestamp: new Date(),
          type: 'troubleshooting'
        };
      } else if (lowerCaseMessage.includes('trash') || lowerCaseMessage.includes('can') || lowerCaseMessage.includes('lid')) {
        botResponse = {
          sender: 'bot',
          content: {
            introText: 'Let\'s troubleshoot your trash can issue:',
            steps: [
              'Check if the batteries need to be replaced (for sensor models).',
              'Clean the sensor lens with a soft, dry cloth.',
              'Make sure there are no obstructions preventing the lid from closing.',
              'Reset the can by removing the batteries for 30 seconds, then reinstalling them.'
            ],
            additionalHelp: 'Need more help with your trash can?',
            supportLink: '#'
          },
          timestamp: new Date(),
          type: 'troubleshooting'
        };
      } else if (lowerCaseMessage.includes('mirror')) {
        botResponse = {
          sender: 'bot',
          content: {
            introText: 'Let\'s resolve your mirror issue:',
            steps: [
              'Make sure your mirror is fully charged or plugged in.',
              'If the light isn\'t working, try resetting by holding the power button for 5 seconds.',
              'For sensor issues, clean the sensor area with a soft cloth.',
              'Check that the charging cable is properly connected to both the mirror and power source.'
            ],
            additionalHelp: 'If you\'re still having trouble with your mirror, I can connect you with technical support.',
            supportLink: '#'
          },
          timestamp: new Date(),
          type: 'troubleshooting'
        };
      } else {
        botResponse = {
          sender: 'bot',
          content: 'I\'d be happy to help troubleshoot your issue. To provide the best assistance, could you please tell me which Simplehuman product you\'re having trouble with?',
          timestamp: new Date(),
          type: 'text'
        };
      }
    } else if (
      lowerCaseMessage.includes('warranty') || 
      lowerCaseMessage.includes('register') ||
      lowerCaseMessage.includes('registration')
    ) {
      botResponse = {
        sender: 'bot',
        content: 'To register your product for warranty coverage, I\'ll need a few details. Could you provide your product name or model number? You can usually find this on the bottom or back of your Simplehuman product.',
        timestamp: new Date(),
        type: 'text'
      };
    } else {
      // Default response for unrecognized queries
      botResponse = {
        sender: 'bot',
        content: 'I can help you find the perfect Simplehuman product, troubleshoot issues, or assist with order management. What would you like help with today?',
        timestamp: new Date(),
        type: 'text'
      };
    }
    
    setMessages(prev => [...prev, botResponse]);
    setIsTyping(false);
  }, []);

  // Handle room selection for product recommendations
  const handleRoomSelection = async (room: string, category: string) => {
    setIsTyping(true);
    await delay(1000);
    
    // Filter products by room and category
    const filteredProducts = mockProducts.filter(
      product => product.category === category && 
      (product.roomType?.includes(room) || room === 'other')
    );
    
    const responseMessage: Message = {
      sender: 'bot',
      content: {
        introText: `Here are some ${category.replace('-', ' ')} options that would work well in your ${room}:`,
        products: filteredProducts.slice(0, 3) // Limit to 3 products
      },
      timestamp: new Date(),
      type: 'product-recommendation'
    };
    
    setMessages(prev => [...prev, responseMessage]);
    setIsTyping(false);
  };

  // Handle dispenser selection for product recommendations
  const handleDispenserSelection = async (type: string) => {
    setIsTyping(true);
    await delay(1000);
    
    // Filter products by dispenser type
    const filteredProducts = mockProducts.filter(
      product => product.category === 'soap-dispenser' && 
      (product.features.some(f => f.toLowerCase().includes(type)) || type === 'any')
    );
    
    const responseMessage: Message = {
      sender: 'bot',
      content: {
        introText: `Here are some ${type} soap dispensers you might like:`,
        products: filteredProducts.slice(0, 3) // Limit to 3 products
      },
      timestamp: new Date(),
      type: 'product-recommendation'
    };
    
    setMessages(prev => [...prev, responseMessage]);
    setIsTyping(false);
  };

  // Handle mirror selection for product recommendations
  const handleMirrorSelection = async (feature: string) => {
    setIsTyping(true);
    await delay(1000);
    
    // Filter products by mirror feature
    const filteredProducts = mockProducts.filter(
      product => product.category === 'mirror' && 
      (product.features.some(f => f.toLowerCase().includes(feature)) || feature === 'all')
    );
    
    const responseMessage: Message = {
      sender: 'bot',
      content: {
        introText: `Here are mirrors with ${feature === 'all' ? 'various features' : feature} that might interest you:`,
        products: filteredProducts.slice(0, 3) // Limit to 3 products
      },
      timestamp: new Date(),
      type: 'product-recommendation'
    };
    
    setMessages(prev => [...prev, responseMessage]);
    setIsTyping(false);
  };

  // Send a user message
  const sendMessage = useCallback((content: string) => {
    const userMessage: Message = {
      sender: 'user',
      content,
      timestamp: new Date(),
      type: 'text'
    };
    
    setMessages(prev => [...prev, userMessage]);
    processMessage(content);
  }, [processMessage]);

  return { messages, sendMessage, isTyping };
};