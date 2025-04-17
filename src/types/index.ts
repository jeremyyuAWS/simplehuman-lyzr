export interface ProductOption {
  label: string;
  value: string;
  onClick?: () => void;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  features: string[];
  roomType?: string[];
  finishType?: string;
  capacity?: string;
  soapType?: string;
  magnification?: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  subcategories: string[];
  roomTypes: string[];
  featureOptions: string[];
}

export interface Order {
  orderNumber: string;
  status: string;
  estimatedDelivery: string;
  orderDate?: string;
  progressPercentage: number;
  items: {
    name: string;
    quantity: number;
    price: number;
    imageUrl?: string;
  }[];
}

export interface WarrantyRegistration {
  productId: string;
  productName: string;
  serialNumber: string;
  purchaseDate: string;
  expiryDate: string;
  status: string;
  coverageType: string;
  imageUrl?: string;
}

export interface ReturnRequest {
  orderNumber: string;
  returnRequestId: string;
  status: string;
  createdDate: string;
  reason: string;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  refundAmount: number;
  refundMethod: string;
}

export interface TroubleshootingIssue {
  issue: string;
  steps: string[];
}

export interface ProductOptionsContent {
  question: string;
  options: ProductOption[];
}

export interface ProductRecommendationContent {
  introText: string;
  products: Product[];
}

export interface TroubleshootingContent {
  introText: string;
  steps: string[];
  additionalHelp?: string;
  supportLink?: string;
}

export interface OrderTrackingContent {
  introText: string;
  order: Order;
}

export interface OrderHistoryContent {
  introText: string;
  orders: Order[];
}

export interface WarrantyContent {
  introText: string;
  registrations: WarrantyRegistration[];
  additionalHelp?: string;
}

export interface ReturnContent {
  introText: string;
  request?: ReturnRequest;
  policy?: string;
  steps?: string[];
}

export interface ProductComparisonContent {
  introText: string;
  products: Product[];
  comparisonPoints: {
    name: string;
    values: {[key: string]: string | boolean | number}
  }[];
}

export interface LoginRequiredContent {
  message: string;
  loginAction?: () => void;
}

export type MessageContent = 
  | string 
  | ProductOptionsContent 
  | ProductRecommendationContent
  | TroubleshootingContent
  | OrderTrackingContent
  | OrderHistoryContent
  | WarrantyContent
  | ReturnContent
  | ProductComparisonContent
  | LoginRequiredContent;

export interface Message {
  sender: 'user' | 'bot';
  content: MessageContent;
  timestamp: Date;
  type?: 'text' | 'product-options' | 'product-recommendation' | 'troubleshooting' | 'order-tracking' | 'order-history' | 'warranty' | 'return' | 'product-comparison' | 'login-required';
  requiresAuth?: boolean;
  intent?: string[];
  entities?: {[key: string]: string};
  context?: {[key: string]: any};
  image?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isDemo?: boolean;
  demoType?: 'regular' | 'premium' | 'new';
}

export interface ConversationContext {
  userIntents: string[];
  productInterests: string[];
  roomTypes: string[];
  features: string[];
  issues: string[];
  lastOrderId?: string;
  lastProductCategory?: string;
  preferredFinish?: string;
  previousQuestions: string[];
  conversationStage: 'initial' | 'discovery' | 'recommendation' | 'troubleshooting' | 'post-purchase' | 'confirmation';
  lastMessageTime: Date;
}

export interface IntentRouterResponse {
  message: Message;
  contextUpdates?: Partial<ConversationContext>;
}

// Analytics Interfaces
export interface UserProfile {
  id: string;
  productInterests: string[];
  roomTypes: string[];
  preferredFeatures: string[];
  issues: string[];
  sessionCount: number;
  lastSession: Date;
  location?: string;
  device?: string;
  valueSegment?: 'high' | 'medium' | 'low';
}

export interface AnalyticsData {
  totalSessions: number;
  uniqueUsers: number;
  averageSessionDuration: number;
  messageCount: {
    user: number;
    bot: number;
  };
  intentDistribution: {
    [key: string]: number;
  };
  productInterestDistribution: {
    [key: string]: number;
  };
  roomTypeDistribution: {
    [key: string]: number;
  };
  featureInterestDistribution: {
    [key: string]: number;
  };
  commonIssues: {
    [key: string]: number;
  };
  conversionRate: number;
  satisfactionScore: number;
  topQuestions: {
    question: string;
    count: number;
  }[];
  userProfiles: UserProfile[];
}

export interface MarketingInsight {
  id: string;
  title: string;
  description: string;
  type: 'product' | 'segment' | 'feature' | 'behavior';
  impact: 'high' | 'medium' | 'low';
  recommendedAction?: string;
  relatedData?: any;
}

export interface ConversationScenario {
  title: string;
  description: string;
  conversations: {
    sender: 'user' | 'bot';
    message: string;
    image?: string;
  }[];
  outcomes: string[];
  metrics?: {
    satisfactionScore?: number;
    timeToResolution?: string;
    sentimentShift?: string;
    crossSellSuccess?: boolean;
    deflectionSuccess?: boolean;
  };
}

export interface DemoUserProfile {
  id: string;
  name: string;
  email: string;
  type: 'regular' | 'premium' | 'new';
  purchaseHistory: {
    totalOrders: number;
    totalSpent: number;
    averageOrderValue: number;
    firstPurchase: string;
    lastPurchase: string;
  };
  preferences: {
    productCategories: string[];
    rooms: string[];
    features: string[];
    finishes: string[];
  };
}