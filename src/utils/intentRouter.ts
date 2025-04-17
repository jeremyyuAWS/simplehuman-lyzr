import { Message, ConversationContext, IntentRouterResponse, Product } from '../types';
import { mockProducts, productCategories, troubleshootingIssues, commonAnswers, productQuestions } from '../data/mockProducts';
import { mockOrders, getMockOrders, mockWarrantyRegistrations, mockReturnRequests } from '../data/mockOrders';
import { useAuthStore } from '../store/authStore';
import { format, differenceInDays } from 'date-fns';

// Enhanced NLP intent classifier with more patterns and context awareness
const classifyIntent = (message: string, context: ConversationContext): string[] => {
  const lowercaseMessage = message.toLowerCase();
  const intents: string[] = [];

  // Product discovery intents with expanded patterns
  if (
    lowercaseMessage.includes('find') || 
    lowercaseMessage.includes('looking for') || 
    lowercaseMessage.includes('need a') ||
    lowercaseMessage.includes('want a') ||
    lowercaseMessage.includes('recommend') ||
    lowercaseMessage.includes('suggest') ||
    lowercaseMessage.includes('best') ||
    lowercaseMessage.includes('which') ||
    (lowercaseMessage.includes('help') && lowercaseMessage.includes('choose'))
  ) {
    intents.push('product_discovery');
  }

  // Product specific intents with expanded patterns
  if (
    lowercaseMessage.includes('trash') || 
    lowercaseMessage.includes('garbage') ||
    lowercaseMessage.includes('waste') ||
    lowercaseMessage.includes('bin') ||
    (lowercaseMessage.includes('can') && !lowercaseMessage.includes('can you'))
  ) {
    intents.push('trash_can');
  }

  if (
    lowercaseMessage.includes('soap') || 
    lowercaseMessage.includes('dispenser') ||
    lowercaseMessage.includes('sanitizer') ||
    lowercaseMessage.includes('hand wash')
  ) {
    intents.push('soap_dispenser');
  }

  if (
    lowercaseMessage.includes('mirror') ||
    lowercaseMessage.includes('makeup') ||
    lowercaseMessage.includes('vanity') ||
    lowercaseMessage.includes('magnif')
  ) {
    intents.push('mirror');
  }

  if (
    lowercaseMessage.includes('paper towel') ||
    lowercaseMessage.includes('kitchen roll') ||
    lowercaseMessage.includes('towel holder')
  ) {
    intents.push('paper_towel');
  }

  if (
    lowercaseMessage.includes('dish rack') ||
    lowercaseMessage.includes('dish drainer') ||
    lowercaseMessage.includes('dishrack') ||
    lowercaseMessage.includes('drying rack')
  ) {
    intents.push('dish_rack');
  }

  // Troubleshooting intents with expanded patterns
  if (
    lowercaseMessage.includes('not working') ||
    lowercaseMessage.includes('broken') ||
    lowercaseMessage.includes('issue') ||
    lowercaseMessage.includes('problem') ||
    lowercaseMessage.includes('trouble') ||
    lowercaseMessage.includes('help me fix') ||
    lowercaseMessage.includes('doesn\'t work') ||
    lowercaseMessage.includes('stopped working') ||
    lowercaseMessage.includes('isn\'t working') ||
    lowercaseMessage.includes('how to fix') ||
    lowercaseMessage.includes('repair')
  ) {
    intents.push('troubleshooting');
  }

  // Order related intents with expanded patterns
  if (
    lowercaseMessage.includes('order') ||
    lowercaseMessage.includes('purchase') ||
    lowercaseMessage.includes('delivery') ||
    lowercaseMessage.includes('shipping') ||
    lowercaseMessage.includes('track') ||
    lowercaseMessage.includes('package') ||
    lowercaseMessage.includes('shipment') ||
    lowercaseMessage.includes('buy') ||
    lowercaseMessage.includes('bought')
  ) {
    intents.push('order_management');
  }

  // Warranty related intents with expanded patterns
  if (
    lowercaseMessage.includes('warranty') ||
    lowercaseMessage.includes('register') ||
    lowercaseMessage.includes('guarantee') ||
    lowercaseMessage.includes('registration') ||
    lowercaseMessage.includes('covered') ||
    (lowercaseMessage.includes('how') && lowercaseMessage.includes('long') && 
     (lowercaseMessage.includes('warranty') || lowercaseMessage.includes('guarantee')))
  ) {
    intents.push('warranty');
  }

  // Return related intents with expanded patterns
  if (
    lowercaseMessage.includes('return') ||
    lowercaseMessage.includes('refund') ||
    lowercaseMessage.includes('send back') ||
    lowercaseMessage.includes('money back') ||
    lowercaseMessage.includes('exchange') ||
    lowercaseMessage.includes('don\'t want') ||
    lowercaseMessage.includes('changed my mind')
  ) {
    intents.push('returns');
  }

  // Comparison intents
  if (
    lowercaseMessage.includes('compare') ||
    lowercaseMessage.includes('difference') ||
    lowercaseMessage.includes('better') ||
    lowercaseMessage.includes('versus') ||
    lowercaseMessage.includes('vs') ||
    (lowercaseMessage.includes('which') && 
     (lowercaseMessage.includes('better') || lowercaseMessage.includes('best')))
  ) {
    intents.push('product_comparison');
  }

  // General information intent
  if (
    lowercaseMessage.includes('how to') ||
    lowercaseMessage.includes('what is') ||
    lowercaseMessage.includes('tell me about') ||
    lowercaseMessage.includes('explain')
  ) {
    intents.push('general_information');
  }

  // Affirmation/confirmation intents
  if (
    lowercaseMessage === 'yes' ||
    lowercaseMessage === 'yeah' ||
    lowercaseMessage === 'yep' ||
    lowercaseMessage === 'sure' ||
    lowercaseMessage === 'ok' ||
    lowercaseMessage === 'okay' ||
    lowercaseMessage === 'sounds good' ||
    lowercaseMessage === 'that works' ||
    lowercaseMessage === 'correct'
  ) {
    intents.push('affirmation');
  }

  // Negation intents
  if (
    lowercaseMessage === 'no' ||
    lowercaseMessage === 'nope' ||
    lowercaseMessage === 'not really' ||
    lowercaseMessage === 'i don\'t think so' ||
    lowercaseMessage === 'not interested'
  ) {
    intents.push('negation');
  }

  // Thank you intents
  if (
    lowercaseMessage.includes('thank') ||
    lowercaseMessage.includes('thanks') ||
    lowercaseMessage === 'ty'
  ) {
    intents.push('gratitude');
  }

  // If no intents detected, check context to determine next best intent
  if (intents.length === 0) {
    // If we were in discovery and user just gives a short response, continue discovery
    if (context.conversationStage === 'discovery') {
      intents.push('continuation');
    } 
    // If we were in troubleshooting, continue troubleshooting
    else if (context.conversationStage === 'troubleshooting') {
      intents.push('continuation');
    }
    // Default to general inquiry
    else {
      intents.push('general_inquiry');
    }
  }

  return intents;
};

// Enhanced entity extraction from user message
const extractEntities = (message: string, context: ConversationContext): {[key: string]: string} => {
  const lowercaseMessage = message.toLowerCase();
  const entities: {[key: string]: string} = {};

  // Extract product categories
  productCategories.forEach(category => {
    if (lowercaseMessage.includes(category.id.replace('-', ' '))) {
      entities['product_category'] = category.id;
    }
    // Check for category name match
    if (lowercaseMessage.includes(category.name.toLowerCase())) {
      entities['product_category'] = category.id;
    }
  });

  // Extract room types
  const roomTypes = ['kitchen', 'bathroom', 'office', 'bedroom', 'living room', 'utility'];
  roomTypes.forEach(room => {
    if (lowercaseMessage.includes(room)) {
      entities['room_type'] = room === 'living room' ? 'living' : room;
    }
  });

  // Extract features
  const allFeatures = productCategories.flatMap(category => category.featureOptions);
  allFeatures.forEach(feature => {
    if (lowercaseMessage.includes(feature.toLowerCase())) {
      entities['feature'] = feature;
    }
  });

  // Extract finish types
  const finishTypes = ['stainless steel', 'black', 'white', 'rose gold', 'brass', 'nickel', 'matte black'];
  finishTypes.forEach(finish => {
    if (lowercaseMessage.includes(finish)) {
      entities['finish_type'] = finish;
    }
  });

  // Extract size preferences
  const sizePatterns = [
    { pattern: /small|compact|tiny|little/, value: 'small' },
    { pattern: /medium|mid-size|regular/, value: 'medium' },
    { pattern: /large|big|spacious|roomy/, value: 'large' }
  ];
  
  sizePatterns.forEach(sizePattern => {
    if (sizePattern.pattern.test(lowercaseMessage)) {
      entities['size_preference'] = sizePattern.value;
    }
  });

  // Extract specific product mentions by name
  mockProducts.forEach(product => {
    if (lowercaseMessage.includes(product.name.toLowerCase())) {
      entities['product_name'] = product.name;
      entities['product_id'] = product.id;
    }
  });

  // Extract order numbers (format SH + 6 digits)
  const orderNumberMatch = message.match(/SH\d{6}/i);
  if (orderNumberMatch) {
    entities['order_number'] = orderNumberMatch[0];
  }

  // Extract price ranges
  const priceRangeMatch = message.match(/(\$\d+|\d+ dollars)/);
  if (priceRangeMatch) {
    entities['price_mention'] = priceRangeMatch[0];
  }

  return entities;
};

// Handle product discovery intents with context awareness
const handleProductDiscovery = (
  message: string, 
  context: ConversationContext
): IntentRouterResponse => {
  // Extract entities from message
  const entities = extractEntities(message, context);
  const intents = classifyIntent(message, context);
  
  // Update context
  const contextUpdates: Partial<ConversationContext> = {
    userIntents: [...context.userIntents, 'product_discovery'],
    conversationStage: 'discovery'
  };
  
  // Update product interests if detected
  const productTypes = ['trash_can', 'soap_dispenser', 'mirror', 'paper_towel', 'dish_rack'];
  const detectedProductType = intents.find(intent => productTypes.includes(intent));
  if (detectedProductType && !context.productInterests.includes(detectedProductType)) {
    contextUpdates.productInterests = [...context.productInterests, detectedProductType];
    contextUpdates.lastProductCategory = detectedProductType;
  }
  
  // Update room types if detected
  if (entities['room_type'] && !context.roomTypes.includes(entities['room_type'])) {
    contextUpdates.roomTypes = [...context.roomTypes, entities['room_type']];
  }
  
  // Update features if detected
  if (entities['feature'] && !context.features.includes(entities['feature'])) {
    contextUpdates.features = [...context.features, entities['feature']];
  }
  
  // Update finish preference if detected
  if (entities['finish_type']) {
    contextUpdates.preferredFinish = entities['finish_type'];
  }
  
  // If we have specific product ID or name, show that product directly
  if (entities['product_id']) {
    const product = mockProducts.find(p => p.id === entities['product_id']);
    if (product) {
      return {
        message: {
          sender: 'bot',
          content: {
            introText: `Here's information about the ${product.name}:`,
            products: [product]
          },
          timestamp: new Date(),
          type: 'product-recommendation',
          intent: ['product_discovery'],
          entities
        },
        contextUpdates
      };
    }
  }
  
  // If we have product category and room type, we can recommend products
  if ((context.productInterests.length > 0 || detectedProductType) && 
      (context.roomTypes.length > 0 || entities['room_type'])) {
    // Map intents to product categories
    const categoryMap: Record<string, string> = {
      'trash_can': 'trash-can',
      'soap_dispenser': 'soap-dispenser',
      'mirror': 'mirror',
      'paper_towel': 'paper-towel',
      'dish_rack': 'dish-rack'
    };
    
    const category = categoryMap[detectedProductType || context.productInterests[0]];
    const room = entities['room_type'] || context.roomTypes[0];
    
    // Filter products by category and room
    let filteredProducts = mockProducts.filter(
      product => product.category === category && 
        (product.roomType?.includes(room) || room === 'other')
    );
    
    // Further filter by features if available
    const features = [...context.features];
    if (entities['feature'] && !features.includes(entities['feature'])) {
      features.push(entities['feature']);
    }
    
    if (features.length > 0) {
      filteredProducts = filteredProducts.filter(product => 
        features.some(feature => 
          product.features.some(f => f.toLowerCase().includes(feature.toLowerCase()))
        )
      );
    }
    
    // Filter by finish if specified
    if (contextUpdates.preferredFinish || context.preferredFinish) {
      const finish = contextUpdates.preferredFinish || context.preferredFinish;
      filteredProducts = filteredProducts.filter(product => 
        product.finishType?.toLowerCase().includes(finish?.toLowerCase() || '')
      );
    }
    
    // If we have filtered products, return recommendations
    if (filteredProducts.length > 0) {
      return {
        message: {
          sender: 'bot',
          content: {
            introText: `Here are some ${category.replace('-', ' ')} options that would work well in your ${room}${features.length > 0 ? ' with the features you wanted' : ''}:`,
            products: filteredProducts.slice(0, 3) // Limit to 3 products
          },
          timestamp: new Date(),
          type: 'product-recommendation',
          intent: ['product_discovery'],
          entities
        },
        contextUpdates
      };
    } else {
      // No products match all filters, so return a broader set
      filteredProducts = mockProducts.filter(
        product => product.category === category
      );
      
      return {
        message: {
          sender: 'bot',
          content: {
            introText: `I couldn't find exact matches for all your preferences, but here are some ${category.replace('-', ' ')} options you might like:`,
            products: filteredProducts.slice(0, 3) // Limit to 3 products
          },
          timestamp: new Date(),
          type: 'product-recommendation',
          intent: ['product_discovery'],
          entities
        },
        contextUpdates
      };
    }
  }
  
  // If we have product type but no room type, ask for room type
  if ((context.productInterests.length > 0 || detectedProductType) && 
      context.roomTypes.length === 0 && !entities['room_type']) {
    
    const productIntent = detectedProductType || context.productInterests[0];
    const productName = productIntent.replace('_', ' ');
    
    // Map category ID to readable name
    const categoryMap: Record<string, string> = {
      'trash_can': 'trash can',
      'soap_dispenser': 'soap dispenser',
      'mirror': 'mirror',
      'paper_towel': 'paper towel holder',
      'dish_rack': 'dish rack'
    };
    
    const readableProductName = categoryMap[productIntent] || productName;
    
    // Get appropriate room options based on product type
    let roomOptions = [];
    switch (productIntent) {
      case 'trash_can':
        roomOptions = [
          { label: 'Kitchen', value: 'kitchen' },
          { label: 'Bathroom', value: 'bathroom' },
          { label: 'Office', value: 'office' },
          { label: 'Bedroom', value: 'bedroom' }
        ];
        break;
      case 'soap_dispenser':
        roomOptions = [
          { label: 'Kitchen', value: 'kitchen' },
          { label: 'Bathroom', value: 'bathroom' }
        ];
        break;
      case 'mirror':
        roomOptions = [
          { label: 'Bathroom', value: 'bathroom' },
          { label: 'Bedroom', value: 'bedroom' }
        ];
        break;
      case 'paper_towel':
        roomOptions = [
          { label: 'Kitchen', value: 'kitchen' },
          { label: 'Utility Room', value: 'utility' }
        ];
        break;
      case 'dish_rack':
        roomOptions = [
          { label: 'Kitchen', value: 'kitchen' }
        ];
        break;
      default:
        roomOptions = [
          { label: 'Kitchen', value: 'kitchen' },
          { label: 'Bathroom', value: 'bathroom' },
          { label: 'Office', value: 'office' },
          { label: 'Other', value: 'other' }
        ];
    }
    
    return {
      message: {
        sender: 'bot',
        content: {
          question: `Great! I can help you find the perfect ${readableProductName}. Where will you be using it?`,
          options: roomOptions
        },
        timestamp: new Date(),
        type: 'product-options',
        intent: ['product_discovery'],
        entities
      },
      contextUpdates
    };
  }
  
  // If we have room type but no product type, ask for product type
  if (context.productInterests.length === 0 && !detectedProductType && 
      (context.roomTypes.length > 0 || entities['room_type'])) {
    
    const room = entities['room_type'] || context.roomTypes[0];
    
    // Filter product categories by room compatibility
    const compatibleCategories = productCategories.filter(category => 
      category.roomTypes.includes(room)
    );
    
    const options = compatibleCategories.map(category => ({
      label: category.name,
      value: category.id
    }));
    
    return {
      message: {
        sender: 'bot',
        content: {
          question: `What type of product are you looking for your ${room}?`,
          options
        },
        timestamp: new Date(),
        type: 'product-options',
        intent: ['product_discovery'],
        entities
      },
      contextUpdates: {
        ...contextUpdates,
        roomTypes: [...context.roomTypes, entities['room_type'] || ''].filter(Boolean)
      }
    };
  }
  
  // If we have no product type or room type, ask for product type first
  return {
    message: {
      sender: 'bot',
      content: {
        question: "I'd be happy to help you find the perfect Simplehuman product. What type of product are you looking for?",
        options: productCategories.map(category => ({
          label: category.name,
          value: category.id
        }))
      },
      timestamp: new Date(),
      type: 'product-options',
      intent: ['product_discovery'],
      entities
    },
    contextUpdates
  };
};

// Handle product comparison intents
const handleProductComparison = (
  message: string, 
  context: ConversationContext
): IntentRouterResponse => {
  const entities = extractEntities(message, context);
  const intents = classifyIntent(message, context);
  
  // Update context
  const contextUpdates: Partial<ConversationContext> = {
    userIntents: [...context.userIntents, 'product_comparison'],
    conversationStage: 'discovery'
  };
  
  // If we have a product category in context or entities, compare products in that category
  const productCategory = entities['product_category'] || 
                         (context.lastProductCategory ? 
                            context.lastProductCategory.replace('_', '-') : '');
  
  if (productCategory) {
    // Get products from the category
    const productsToCompare = mockProducts.filter(
      product => product.category === productCategory
    );
    
    if (productsToCompare.length >= 2) {
      // Get top products (up to 3)
      const topProducts = productsToCompare.slice(0, 3);
      
      // Build comparison points based on category
      const comparisonPoints = [];
      
      // Common points for all products
      comparisonPoints.push({
        name: "Price",
        values: Object.fromEntries(topProducts.map(p => [p.id, `$${p.price.toFixed(2)}`]))
      });
      
      comparisonPoints.push({
        name: "Finish",
        values: Object.fromEntries(topProducts.map(p => [p.id, p.finishType || 'N/A']))
      });
      
      // Category-specific comparison points
      switch (productCategory) {
        case 'trash-can':
          comparisonPoints.push({
            name: "Capacity",
            values: Object.fromEntries(topProducts.map(p => [p.id, p.capacity || 'N/A']))
          });
          comparisonPoints.push({
            name: "Motion Sensor",
            values: Object.fromEntries(topProducts.map(p => [p.id, p.features.some(f => f.toLowerCase().includes('sensor'))]))
          });
          comparisonPoints.push({
            name: "Voice Control",
            values: Object.fromEntries(topProducts.map(p => [p.id, p.features.some(f => f.toLowerCase().includes('voice'))]))
          });
          break;
          
        case 'soap-dispenser':
          comparisonPoints.push({
            name: "Soap Type",
            values: Object.fromEntries(topProducts.map(p => [p.id, p.soapType || 'N/A']))
          });
          comparisonPoints.push({
            name: "Rechargeable",
            values: Object.fromEntries(topProducts.map(p => [p.id, p.features.some(f => f.toLowerCase().includes('rechargeable'))]))
          });
          break;
          
        case 'mirror':
          comparisonPoints.push({
            name: "Magnification",
            values: Object.fromEntries(topProducts.map(p => [p.id, p.magnification || 'N/A']))
          });
          comparisonPoints.push({
            name: "Smart Features",
            values: Object.fromEntries(topProducts.map(p => [p.id, p.features.some(f => f.toLowerCase().includes('alexa') || f.toLowerCase().includes('smart'))]))
          });
          break;
      }
      
      return {
        message: {
          sender: 'bot',
          content: {
            introText: `Here's a comparison of our top ${productCategory.replace('-', ' ')} models:`,
            products: topProducts,
            comparisonPoints
          },
          timestamp: new Date(),
          type: 'product-comparison',
          intent: ['product_comparison'],
          entities
        },
        contextUpdates
      };
    }
  }
  
  // If we have no specific category, ask what they want to compare
  return {
    message: {
      sender: 'bot',
      content: {
        question: "I'd be happy to compare products for you. What type of products would you like to compare?",
        options: productCategories.map(category => ({
          label: category.name,
          value: category.id
        }))
      },
      timestamp: new Date(),
      type: 'product-options',
      intent: ['product_comparison'],
      entities
    },
    contextUpdates
  };
};

// Enhanced troubleshooting with more specific issue targeting
const handleTroubleshooting = (
  message: string, 
  context: ConversationContext
): IntentRouterResponse => {
  const entities = extractEntities(message, context);
  const lowercaseMessage = message.toLowerCase();
  
  // Update context
  const contextUpdates: Partial<ConversationContext> = {
    userIntents: [...context.userIntents, 'troubleshooting'],
    conversationStage: 'troubleshooting'
  };
  
  // Extract product type from message or context
  let productType = entities['product_category'];
  
  if (!productType) {
    // Try to find it in context
    if (context.productInterests.length > 0) {
      const categoryMap: Record<string, string> = {
        'trash_can': 'trash-can',
        'soap_dispenser': 'soap-dispenser',
        'mirror': 'mirror',
        'paper_towel': 'paper-towel',
        'dish_rack': 'dish-rack'
      };
      
      productType = categoryMap[context.productInterests[0]];
    }
    
    // Try to detect it from product name
    if (!productType && entities['product_id']) {
      const product = mockProducts.find(p => p.id === entities['product_id']);
      if (product) {
        productType = product.category;
      }
    }
  }
  
  // If we have a product type, find the most specific issue
  if (productType && troubleshootingIssues[productType as keyof typeof troubleshootingIssues]) {
    const productIssues = troubleshootingIssues[productType as keyof typeof troubleshootingIssues];
    let bestIssueMatch: string | null = null;
    
    // Look for specific issues mentioned in the message
    Object.keys(productIssues).forEach(issueKey => {
      const issue = productIssues[issueKey as keyof typeof productIssues];
      if (lowercaseMessage.includes(issue.issue.toLowerCase())) {
        bestIssueMatch = issueKey;
      }
    });
    
    // If we found a specific issue
    if (bestIssueMatch) {
      const issue = productIssues[bestIssueMatch as keyof typeof productIssues];
      contextUpdates.issues = [...context.issues, bestIssueMatch];

      // Try to find product image for this category
      let productImage = '';
      const categoryProducts = mockProducts.filter(p => p.category === productType);
      if (categoryProducts.length > 0) {
        productImage = categoryProducts[0].imageUrl;
      }
      
      return {
        message: {
          sender: 'bot',
          content: {
            introText: `I see you're having an issue with "${issue.issue}". Let's troubleshoot:`,
            steps: issue.steps,
            additionalHelp: "Did this solve your problem? If not, I can provide more specific assistance.",
            supportLink: '#'
          },
          timestamp: new Date(),
          type: 'troubleshooting',
          intent: ['troubleshooting'],
          entities,
          image: productImage
        },
        contextUpdates
      };
    }
    
    // If no specific issue found but we know the product type, show common issues
    return {
      message: {
        sender: 'bot',
        content: {
          question: `I see you're having an issue with your ${productType.replace('-', ' ')}. What specific problem are you experiencing?`,
          options: Object.keys(productIssues).map(issueKey => {
            const issue = productIssues[issueKey as keyof typeof productIssues];
            return {
              label: issue.issue,
              value: issueKey
            };
          })
        },
        timestamp: new Date(),
        type: 'product-options',
        intent: ['troubleshooting'],
        entities
      },
      contextUpdates
    };
  }
  
  // If we don't have a product type, ask for it
  return {
    message: {
      sender: 'bot',
      content: {
        question: "I'd be happy to help troubleshoot your issue. Which Simplehuman product are you having trouble with?",
        options: productCategories.map(category => ({
          label: category.name,
          value: category.id
        }))
      },
      timestamp: new Date(),
      type: 'product-options',
      intent: ['troubleshooting'],
      entities
    },
    contextUpdates
  };
};

// Enhanced order management with order details and tracking
const handleOrderManagement = (
  message: string, 
  context: ConversationContext
): IntentRouterResponse => {
  const entities = extractEntities(message, context);
  
  // Update context
  const contextUpdates: Partial<ConversationContext> = {
    userIntents: [...context.userIntents, 'order_management'],
    conversationStage: 'post-purchase'
  };
  
  // Check if user is authenticated
  const { isAuthenticated, user } = useAuthStore.getState();
  
  if (!isAuthenticated) {
    return {
      message: {
        sender: 'bot',
        content: {
          message: "To access your order information, you'll need to sign in to your account first.",
          loginAction: () => {} // This would typically show login modal
        },
        timestamp: new Date(),
        type: 'login-required',
        requiresAuth: true,
        intent: ['order_management'],
        entities
      },
      contextUpdates
    };
  }
  
  // Get the appropriate order set based on user type
  const userOrders = user?.isDemo && user.demoType 
    ? getMockOrders(user.demoType) 
    : mockOrders;

  // If we have a specific order number
  if (entities['order_number']) {
    const orderNumber = entities['order_number'];
    const order = userOrders.find(o => o.orderNumber === orderNumber);
    
    if (order) {
      contextUpdates.lastOrderId = orderNumber;
      
      return {
        message: {
          sender: 'bot',
          content: {
            introText: `Here's the information for your order ${orderNumber}:`,
            order
          },
          timestamp: new Date(),
          type: 'order-tracking',
          intent: ['order_management'],
          entities
        },
        contextUpdates
      };
    } else {
      return {
        message: {
          sender: 'bot',
          content: `I couldn't find an order with number ${orderNumber}. Please double-check the order number and try again, or I can show you your recent orders.`,
          timestamp: new Date(),
          type: 'text',
          intent: ['order_management'],
          entities
        },
        contextUpdates
      };
    }
  }
  
  // If user says something like "show me my orders", show order history
  if (lowercaseMessage.includes('my orders') || 
      lowercaseMessage.includes('order history') || 
      lowercaseMessage.includes('all orders') ||
      (lowercaseMessage.includes('show') && lowercaseMessage.includes('orders'))) {
    
    if (userOrders.length > 0) {
      return {
        message: {
          sender: 'bot',
          content: {
            introText: `Here ${userOrders.length === 1 ? 'is' : 'are'} your ${userOrders.length === 1 ? 'order' : 'orders'}:`,
            orders: userOrders
          },
          timestamp: new Date(),
          type: 'order-history',
          intent: ['order_management'],
          entities
        },
        contextUpdates
      };
    } else {
      return {
        message: {
          sender: 'bot',
          content: "I don't see any orders associated with your account yet. Once you place an order, you'll be able to track and manage it here.",
          timestamp: new Date(),
          type: 'text',
          intent: ['order_management'],
          entities
        },
        contextUpdates
      };
    }
  }
  
  // If we don't have an order number but user asked to track order, show most recent order
  if (userOrders.length > 0) {
    return {
      message: {
        sender: 'bot',
        content: {
          introText: 'Here\'s your most recent order:',
          order: userOrders[0]
        },
        timestamp: new Date(),
        type: 'order-tracking',
        intent: ['order_management'],
        entities
      },
      contextUpdates: {
        ...contextUpdates,
        lastOrderId: userOrders[0].orderNumber
      }
    };
  }
  
  // If no orders found
  return {
    message: {
      sender: 'bot',
      content: "I don't see any recent orders associated with your account. If you've placed an order and don't see it here, please contact customer support for assistance.",
      timestamp: new Date(),
      type: 'text',
      intent: ['order_management'],
      entities
    },
    contextUpdates
  };
};

// Enhanced warranty handling with registration support
const handleWarranty = (
  message: string, 
  context: ConversationContext
): IntentRouterResponse => {
  const entities = extractEntities(message, context);
  
  // Update context
  const contextUpdates: Partial<ConversationContext> = {
    userIntents: [...context.userIntents, 'warranty'],
    conversationStage: 'post-purchase'
  };
  
  // Check if user is authenticated
  const { isAuthenticated } = useAuthStore.getState();
  
  if (!isAuthenticated) {
    return {
      message: {
        sender: 'bot',
        content: {
          message: "To register your product for warranty or check warranty status, you'll need to sign in to your account first.",
          loginAction: () => {} // This would typically show login modal
        },
        timestamp: new Date(),
        type: 'login-required',
        requiresAuth: true,
        intent: ['warranty'],
        entities
      },
      contextUpdates
    };
  }
  
  // Check if we have warranty registrations
  if (mockWarrantyRegistrations.length > 0) {
    return {
      message: {
        sender: 'bot',
        content: {
          introText: 'Here are your registered products under warranty:',
          registrations: mockWarrantyRegistrations,
          additionalHelp: 'Would you like to register another product for warranty coverage?'
        },
        timestamp: new Date(),
        type: 'warranty',
        intent: ['warranty'],
        entities
      },
      contextUpdates
    };
  }
  
  // If no registrations found or user wants to register a new product
  // Check if we have product info
  if (entities['product_id'] || entities['product_name']) {
    let productId = entities['product_id'];
    
    if (!productId && entities['product_name']) {
      // Try to find product by name
      const product = mockProducts.find(p => 
        p.name.toLowerCase().includes(entities['product_name'].toLowerCase())
      );
      if (product) {
        productId = product.id;
      }
    }
    
    if (productId) {
      const product = mockProducts.find(p => p.id === productId);
      return {
        message: {
          sender: 'bot',
          content: `Great! To register your product for warranty, I'll need your serial number and purchase date. The serial number can usually be found on the bottom or back of your Simplehuman product. Could you please provide this information?`,
          timestamp: new Date(),
          type: 'text',
          intent: ['warranty'],
          entities,
          context: {
            pendingRegistrationProductId: productId
          },
          image: product?.imageUrl
        },
        contextUpdates
      };
    }
  }
  
  // If no product info, ask for product details
  return {
    message: {
      sender: 'bot',
      content: 'To register your product for warranty coverage, I\'ll need a few details. Could you provide your product name or model number? You can usually find this on the bottom or back of your Simplehuman product.',
      timestamp: new Date(),
      type: 'text',
      intent: ['warranty'],
      entities
    },
    contextUpdates
  };
};

// Enhanced returns handling with policy information
const handleReturns = (
  message: string, 
  context: ConversationContext
): IntentRouterResponse => {
  const entities = extractEntities(message, context);
  
  // Update context
  const contextUpdates: Partial<ConversationContext> = {
    userIntents: [...context.userIntents, 'returns'],
    conversationStage: 'post-purchase'
  };
  
  // Check if user is authenticated
  const { isAuthenticated, user } = useAuthStore.getState();
  
  if (!isAuthenticated) {
    return {
      message: {
        sender: 'bot',
        content: {
          message: "To process a return, you'll need to sign in to your account first so we can locate your order.",
          loginAction: () => {} // This would typically show login modal
        },
        timestamp: new Date(),
        type: 'login-required',
        requiresAuth: true,
        intent: ['returns'],
        entities
      },
      contextUpdates
    };
  }
  
  // Get the appropriate order set based on user type
  const userOrders = user?.isDemo && user.demoType 
    ? getMockOrders(user.demoType) 
    : mockOrders;
  
  // Check if we have a specific order number
  if (entities['order_number'] || context.lastOrderId) {
    const orderNumber = entities['order_number'] || context.lastOrderId;
    const order = userOrders.find(o => o.orderNumber === orderNumber);
    
    if (order) {
      // Check return eligibility
      const orderDate = order.orderDate ? new Date(order.orderDate) : new Date(2025, 0, 1); // Simulated order date
      const today = new Date();
      const daysSinceOrder = differenceInDays(today, orderDate);
      
      if (daysSinceOrder <= 90) {
        // Get the product image for the first item
        const productImage = order.items[0]?.imageUrl || '';
        
        return {
          message: {
            sender: 'bot',
            content: {
              introText: `Your order ${orderNumber} is eligible for return. Here's how to proceed:`,
              steps: [
                'Pack the item(s) in their original packaging if possible',
                'Include your order number on a note inside the package',
                'Use the prepaid return label that was included with your order',
                'Drop off the package at any authorized shipping location'
              ],
              policy: 'Our return policy allows returns within 90 days of purchase for a full refund to your original payment method. Return shipping is free.'
            },
            timestamp: new Date(),
            type: 'return',
            intent: ['returns'],
            entities,
            image: productImage
          },
          contextUpdates
        };
      } else {
        return {
          message: {
            sender: 'bot',
            content: {
              introText: `I'm sorry, but your order ${orderNumber} is outside our 90-day return window.`,
              policy: 'Our standard return policy allows returns within 90 days of purchase. For special circumstances or warranty claims, please contact our customer support team.'
            },
            timestamp: new Date(),
            type: 'return',
            intent: ['returns'],
            entities
          },
          contextUpdates
        };
      }
    } else {
      return {
        message: {
          sender: 'bot',
          content: `I couldn't find an order with number ${orderNumber}. Please double-check the order number and try again, or I can show you your recent orders that are eligible for return.`,
          timestamp: new Date(),
          type: 'text',
          intent: ['returns'],
          entities
        },
        contextUpdates
      };
    }
  }
  
  // If we have an existing return request
  if (mockReturnRequests.length > 0) {
    return {
      message: {
        sender: 'bot',
        content: {
          introText: 'Here\'s information about your existing return request:',
          request: mockReturnRequests[0]
        },
        timestamp: new Date(),
        type: 'return',
        intent: ['returns'],
        entities
      },
      contextUpdates
    };
  }
  
  // If no specific order, show return policy and ask for order number
  return {
    message: {
      sender: 'bot',
      content: {
        introText: 'Our return policy allows returns within 90 days of purchase for a full refund.',
        policy: 'To initiate a return, I\'ll need your order number. Can you provide the order number you want to return?'
      },
      timestamp: new Date(),
      type: 'return',
      intent: ['returns'],
      entities
    },
    contextUpdates
  };
};

// Handle general information requests about products and policies
const handleGeneralInformation = (
  message: string, 
  context: ConversationContext
): IntentRouterResponse => {
  const lowercaseMessage = message.toLowerCase();
  
  // Check for warranty information request
  if (lowercaseMessage.includes('warranty')) {
    return {
      message: {
        sender: 'bot',
        content: commonAnswers.warranty,
        timestamp: new Date(),
        type: 'text',
        intent: ['general_information']
      },
      contextUpdates: {
        userIntents: [...context.userIntents, 'general_information'],
        conversationStage: context.conversationStage
      }
    };
  }
  
  // Check for return policy request
  if (lowercaseMessage.includes('return policy') || lowercaseMessage.includes('how to return')) {
    return {
      message: {
        sender: 'bot',
        content: commonAnswers.returns,
        timestamp: new Date(),
        type: 'text',
        intent: ['general_information']
      },
      contextUpdates: {
        userIntents: [...context.userIntents, 'general_information'],
        conversationStage: context.conversationStage
      }
    };
  }
  
  // Check for shipping information request
  if (lowercaseMessage.includes('shipping') || lowercaseMessage.includes('delivery')) {
    return {
      message: {
        sender: 'bot',
        content: commonAnswers.shipping,
        timestamp: new Date(),
        type: 'text',
        intent: ['general_information']
      },
      contextUpdates: {
        userIntents: [...context.userIntents, 'general_information'],
        conversationStage: context.conversationStage
      }
    };
  }
  
  // Check for sensor technology questions
  if (lowercaseMessage.includes('sensor') && (lowercaseMessage.includes('how') || lowercaseMessage.includes('work'))) {
    return {
      message: {
        sender: 'bot',
        content: commonAnswers.sensor_technology,
        timestamp: new Date(),
        type: 'text',
        intent: ['general_information']
      },
      contextUpdates: {
        userIntents: [...context.userIntents, 'general_information'],
        conversationStage: context.conversationStage
      }
    };
  }
  
  // Check for cleaning questions
  if (lowercaseMessage.includes('clean') || lowercaseMessage.includes('maintain')) {
    return {
      message: {
        sender: 'bot',
        content: commonAnswers.cleaning,
        timestamp: new Date(),
        type: 'text',
        intent: ['general_information']
      },
      contextUpdates: {
        userIntents: [...context.userIntents, 'general_information'],
        conversationStage: context.conversationStage
      }
    };
  }
  
  // Check for battery life questions
  if (lowercaseMessage.includes('battery') || lowercaseMessage.includes('charge') || lowercaseMessage.includes('power')) {
    return {
      message: {
        sender: 'bot',
        content: commonAnswers.battery_life,
        timestamp: new Date(),
        type: 'text',
        intent: ['general_information']
      },
      contextUpdates: {
        userIntents: [...context.userIntents, 'general_information'],
        conversationStage: context.conversationStage
      }
    };
  }
  
  // Check for liner questions
  if (lowercaseMessage.includes('liner') || lowercaseMessage.includes('bag') || lowercaseMessage.includes('fit')) {
    return {
      message: {
        sender: 'bot',
        content: commonAnswers.liner_compatibility,
        timestamp: new Date(),
        type: 'text',
        intent: ['general_information']
      },
      contextUpdates: {
        userIntents: [...context.userIntents, 'general_information'],
        conversationStage: context.conversationStage
      }
    };
  }
  
  // Check for refurbished product questions
  if (lowercaseMessage.includes('refurbished') || lowercaseMessage.includes('certified') || lowercaseMessage.includes('used')) {
    return {
      message: {
        sender: 'bot',
        content: commonAnswers.refurbished_products,
        timestamp: new Date(),
        type: 'text',
        intent: ['general_information']
      },
      contextUpdates: {
        userIntents: [...context.userIntents, 'general_information'],
        conversationStage: context.conversationStage
      }
    };
  }
  
  // If we have a product category in context, offer related information
  if (context.lastProductCategory) {
    const categoryMap: Record<string, string> = {
      'trash_can': 'trash-can',
      'soap_dispenser': 'soap-dispenser',
      'mirror': 'mirror',
      'paper_towel': 'paper-towel',
      'dish_rack': 'dish-rack'
    };
    
    const category = categoryMap[context.lastProductCategory];
    
    // Get common questions for this category
    const questions = productQuestions[category as keyof typeof productQuestions];
    
    if (questions && questions.length > 0) {
      return {
        message: {
          sender: 'bot',
          content: {
            question: `Here are some common questions about our ${category.replace('-', ' ')} products:`,
            options: questions.map(q => ({
              label: q,
              value: q
            }))
          },
          timestamp: new Date(),
          type: 'product-options',
          intent: ['general_information']
        },
        contextUpdates: {
          userIntents: [...context.userIntents, 'general_information'],
          conversationStage: context.conversationStage
        }
      };
    }
  }
  
  // Default general information response
  return {
    message: {
      sender: 'bot',
      content: "I can provide information about our products, warranty policies, returns, and more. What specific information are you looking for?",
      timestamp: new Date(),
      type: 'text',
      intent: ['general_information']
    },
    contextUpdates: {
      userIntents: [...context.userIntents, 'general_information'],
      conversationStage: context.conversationStage
    }
  };
};

// Handle continuations in conversation based on context
const handleContinuation = (
  message: string, 
  context: ConversationContext
): IntentRouterResponse => {
  const entities = extractEntities(message, context);
  
  // If we're in discovery stage, continue product discovery
  if (context.conversationStage === 'discovery') {
    return handleProductDiscovery(message, context);
  }
  
  // If we're in troubleshooting, continue troubleshooting
  if (context.conversationStage === 'troubleshooting') {
    return handleTroubleshooting(message, context);
  }
  
  // If user has expressed gratitude
  if (message.toLowerCase().includes('thank') || message.toLowerCase().includes('thanks')) {
    return {
      message: {
        sender: 'bot',
        content: "You're welcome! Is there anything else I can help you with today?",
        timestamp: new Date(),
        type: 'text',
        intent: ['gratitude']
      },
      contextUpdates: {
        conversationStage: 'confirmation'
      }
    };
  }
  
  // Default continuation
  return {
    message: {
      sender: 'bot',
      content: "I'm here to help! You can ask about our products, troubleshooting, order tracking, warranty information, or anything else related to Simplehuman products.",
      timestamp: new Date(),
      type: 'text',
      intent: ['general_inquiry']
    },
    contextUpdates: {
      conversationStage: context.conversationStage
    }
  };
};

// Handle general inquiries with context awareness
const handleGeneralInquiry = (
  message: string, 
  context: ConversationContext
): IntentRouterResponse => {
  // If this is a first message, give a welcome response
  if (context.previousQuestions.length === 0) {
    return {
      message: {
        sender: 'bot',
        content: "Welcome to Simplehuman! I can help you find the perfect products for your home, provide troubleshooting assistance, or help with order management and warranty registration. What can I assist you with today?",
        timestamp: new Date(),
        type: 'text',
        intent: ['general_inquiry']
      },
      contextUpdates: {
        userIntents: [...context.userIntents, 'general_inquiry'],
        previousQuestions: [...context.previousQuestions, message],
        conversationStage: 'initial'
      }
    };
  }
  
  // Otherwise provide a general help message
  return {
    message: {
      sender: 'bot',
      content: "I can help you with finding products, troubleshooting issues, tracking orders, or warranty information. What would you like help with today?",
      timestamp: new Date(),
      type: 'text',
      intent: ['general_inquiry']
    },
    contextUpdates: {
      userIntents: [...context.userIntents, 'general_inquiry'],
      previousQuestions: [...context.previousQuestions, message],
      conversationStage: context.conversationStage
    }
  };
};

// Main intent router function with enhanced context awareness
export const intentRouter = async (
  message: string, 
  context: ConversationContext
): Promise<IntentRouterResponse> => {
  // Classify intent
  const intents = classifyIntent(message, context);
  const lowercaseMessage = message.toLowerCase();
  
  // Handle different intents
  if (intents.includes('product_discovery') || 
      intents.includes('trash_can') || 
      intents.includes('soap_dispenser') || 
      intents.includes('mirror') ||
      intents.includes('paper_towel') ||
      intents.includes('dish_rack')) {
    return handleProductDiscovery(message, context);
  }
  
  if (intents.includes('product_comparison')) {
    return handleProductComparison(message, context);
  }
  
  if (intents.includes('troubleshooting')) {
    return handleTroubleshooting(message, context);
  }
  
  if (intents.includes('order_management')) {
    return handleOrderManagement(message, context);
  }
  
  if (intents.includes('warranty')) {
    return handleWarranty(message, context);
  }
  
  if (intents.includes('returns')) {
    return handleReturns(message, context);
  }
  
  if (intents.includes('general_information')) {
    return handleGeneralInformation(message, context);
  }
  
  if (intents.includes('continuation')) {
    return handleContinuation(message, context);
  }
  
  if (intents.includes('gratitude')) {
    return {
      message: {
        sender: 'bot',
        content: "You're welcome! Is there anything else I can help you with today?",
        timestamp: new Date(),
        type: 'text',
        intent: ['gratitude']
      },
      contextUpdates: {
        conversationStage: 'confirmation'
      }
    };
  }
  
  if (intents.includes('affirmation')) {
    // Handle yes/confirmation based on conversation stage
    if (context.conversationStage === 'recommendation') {
      return {
        message: {
          sender: 'bot',
          content: "Great! Would you like more details about any specific product, or would you like to place an order?",
          timestamp: new Date(),
          type: 'text',
          intent: ['affirmation']
        },
        contextUpdates: {}
      };
    }
    
    if (context.conversationStage === 'troubleshooting') {
      return {
        message: {
          sender: 'bot',
          content: "I'm glad that helped! Is there anything else you'd like help with?",
          timestamp: new Date(),
          type: 'text',
          intent: ['affirmation']
        },
        contextUpdates: {
          conversationStage: 'confirmation'
        }
      };
    }
    
    // Default affirmation
    return {
      message: {
        sender: 'bot',
        content: "Great! How else can I assist you today?",
        timestamp: new Date(),
        type: 'text',
        intent: ['affirmation']
      },
      contextUpdates: {}
    };
  }
  
  if (intents.includes('negation')) {
    // Handle no based on conversation stage
    return {
      message: {
        sender: 'bot',
        content: "Alright. I'm here if you need any further assistance. Is there something else I can help you with?",
        timestamp: new Date(),
        type: 'text',
        intent: ['negation']
      },
      contextUpdates: {
        conversationStage: 'confirmation'
      }
    };
  }
  
  // Default to general inquiry
  return handleGeneralInquiry(message, context);
};