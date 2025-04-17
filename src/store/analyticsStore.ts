import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AnalyticsData, UserProfile, Message, ConversationContext, MarketingInsight } from '../types';
import { format } from 'date-fns';

interface AnalyticsState {
  analyticsData: AnalyticsData;
  currentInsights: MarketingInsight[];
  updateAnalyticsFromMessage: (message: Message, context: ConversationContext) => void;
  updateUserProfile: (userId: string, updates: Partial<UserProfile>) => void;
  generateInsights: () => MarketingInsight[];
  resetAnalytics: () => void;
}

const initialAnalyticsData: AnalyticsData = {
  totalSessions: 0,
  uniqueUsers: 0,
  averageSessionDuration: 0,
  messageCount: {
    user: 0,
    bot: 0,
  },
  intentDistribution: {},
  productInterestDistribution: {},
  roomTypeDistribution: {},
  featureInterestDistribution: {},
  commonIssues: {},
  conversionRate: 0,
  satisfactionScore: 0,
  topQuestions: [],
  userProfiles: [],
};

// Mock insights for demonstration purposes
const mockInsights: MarketingInsight[] = [
  {
    id: 'insight-1',
    title: 'High Kitchen Trash Can Interest',
    description: '68% of users are looking for kitchen trash cans. "Voice control" is the most requested feature.',
    type: 'product',
    impact: 'high',
    recommendedAction: 'Increase marketing focus on voice-controlled kitchen trash cans.',
  },
  {
    id: 'insight-2',
    title: 'Bathroom Soap Dispenser Demand',
    description: 'Bathroom soap dispensers have 52% higher engagement than other room types.',
    type: 'segment',
    impact: 'medium',
    recommendedAction: 'Create bundled offers for bathroom products.',
  },
  {
    id: 'insight-3',
    title: 'Feature Interest: Rechargeable',
    description: '"Rechargeable" feature has growing interest, up 34% this month.',
    type: 'feature',
    impact: 'medium',
    recommendedAction: 'Highlight rechargeable features in product descriptions and ads.',
  },
  {
    id: 'insight-4',
    title: 'Common Issue: Sensor Sensitivity',
    description: '23% of troubleshooting queries relate to sensor sensitivity issues.',
    type: 'behavior',
    impact: 'high',
    recommendedAction: 'Create targeted help content on sensor calibration.',
  },
  {
    id: 'insight-5',
    title: 'Voice Search Growing',
    description: 'Voice input usage has increased by 45% in the last 30 days.',
    type: 'behavior',
    impact: 'medium',
    recommendedAction: 'Optimize content for voice search patterns.',
  }
];

// Mock data for visualization
const generateMockTimelineData = () => {
  const data = [];
  const now = new Date();
  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(now.getDate() - i);
    data.push({
      date: format(date, 'MMM dd'),
      sessions: Math.floor(Math.random() * 20) + 10,
      users: Math.floor(Math.random() * 15) + 5,
    });
  }
  return data;
};

export const useAnalyticsStore = create<AnalyticsState>()(
  persist(
    (set, get) => ({
      analyticsData: {
        ...initialAnalyticsData,
        totalSessions: 124,
        uniqueUsers: 89,
        averageSessionDuration: 245,
        messageCount: {
          user: 357,
          bot: 412,
        },
        intentDistribution: {
          product_discovery: 45,
          troubleshooting: 28,
          order_management: 15,
          warranty: 7,
          returns: 5,
        },
        productInterestDistribution: {
          trash_can: 42,
          soap_dispenser: 21,
          mirror: 18,
          paper_towel: 10,
          dish_rack: 9,
        },
        roomTypeDistribution: {
          kitchen: 48,
          bathroom: 29,
          office: 12,
          bedroom: 8,
          utility: 3,
        },
        featureInterestDistribution: {
          'Motion Sensor': 38,
          'Voice Control': 22,
          'Rechargeable': 17,
          'Stainless Steel': 14,
          'Compact': 9,
        },
        commonIssues: {
          'sensor_not_working': 32,
          'battery_life': 24,
          'voice_control_issues': 18,
          'soap_dispenser_clogged': 15,
          'mirror_lighting': 11,
        },
        conversionRate: 12.4,
        satisfactionScore: 4.2,
        topQuestions: [
          { question: "How do I replace batteries in my trash can?", count: 24 },
          { question: "Which liner fits my model?", count: 18 },
          { question: "How do I clean my soap dispenser?", count: 15 },
          { question: "Is there a warranty on mirrors?", count: 12 },
          { question: "Can I use regular soap in the dispenser?", count: 10 },
        ],
        userProfiles: [
          {
            id: 'user-1',
            productInterests: ['trash_can', 'soap_dispenser'],
            roomTypes: ['kitchen', 'bathroom'],
            preferredFeatures: ['Motion Sensor', 'Voice Control'],
            issues: ['battery_life'],
            sessionCount: 3,
            lastSession: new Date(),
            location: 'California',
            device: 'desktop',
            valueSegment: 'high',
          },
          // More mock profiles would go here
        ],
      },
      currentInsights: mockInsights,
      
      updateAnalyticsFromMessage: (message: Message, context: ConversationContext) => {
        const { analyticsData } = get();
        
        // Update relevant counts based on message type
        set({
          analyticsData: {
            ...analyticsData,
            messageCount: {
              user: message.sender === 'user' ? analyticsData.messageCount.user + 1 : analyticsData.messageCount.user,
              bot: message.sender === 'bot' ? analyticsData.messageCount.bot + 1 : analyticsData.messageCount.bot,
            },
            // In a real implementation, we would update more metrics here
          }
        });
      },
      
      updateUserProfile: (userId: string, updates: Partial<UserProfile>) => {
        const { analyticsData } = get();
        
        // Find existing profile or create new one
        const existingProfileIndex = analyticsData.userProfiles.findIndex(profile => profile.id === userId);
        
        if (existingProfileIndex >= 0) {
          // Update existing profile
          const updatedProfiles = [...analyticsData.userProfiles];
          updatedProfiles[existingProfileIndex] = {
            ...updatedProfiles[existingProfileIndex],
            ...updates,
          };
          
          set({
            analyticsData: {
              ...analyticsData,
              userProfiles: updatedProfiles,
            }
          });
        } else {
          // Create new profile
          const newProfile: UserProfile = {
            id: userId,
            productInterests: [],
            roomTypes: [],
            preferredFeatures: [],
            issues: [],
            sessionCount: 1,
            lastSession: new Date(),
            ...updates,
          };
          
          set({
            analyticsData: {
              ...analyticsData,
              userProfiles: [...analyticsData.userProfiles, newProfile],
              uniqueUsers: analyticsData.uniqueUsers + 1,
            }
          });
        }
      },
      
      generateInsights: () => {
        // In a real implementation, this would analyze the data and generate insights
        // For demo purposes, we're using mock insights
        return mockInsights;
      },
      
      resetAnalytics: () => {
        set({ analyticsData: initialAnalyticsData, currentInsights: [] });
      }
    }),
    {
      name: 'simplehuman-analytics-storage',
    }
  )
);

// Export the mock timeline data for visualization components
export const mockTimelineData = generateMockTimelineData();

// Mock data for product interest by room type (for cross analysis)
export const mockProductByRoomData = [
  { name: 'Kitchen', 'Trash Can': 32, 'Soap Dispenser': 24, 'Paper Towel': 18, 'Dish Rack': 26 },
  { name: 'Bathroom', 'Trash Can': 25, 'Soap Dispenser': 38, 'Mirror': 29, 'Paper Towel': 8 },
  { name: 'Office', 'Trash Can': 18, 'Soap Dispenser': 12, 'Mirror': 5, 'Paper Towel': 3 },
  { name: 'Bedroom', 'Trash Can': 11, 'Mirror': 24, 'Soap Dispenser': 4 },
];

// Mock data for user journey stages
export const mockUserJourneyData = [
  { name: 'Initial Interest', count: 100, percent: 100 },
  { name: 'Product Discovery', count: 78, percent: 78 },
  { name: 'Feature Comparison', count: 52, percent: 52 },
  { name: 'Troubleshooting', count: 23, percent: 23 },
  { name: 'Purchase Decision', count: 18, percent: 18 },
];

// Mock data for feature interest by product
export const mockFeatureByProductData = [
  { feature: 'Motion Sensor', 'Trash Can': 42, 'Soap Dispenser': 36, 'Mirror': 12 },
  { feature: 'Voice Control', 'Trash Can': 38, 'Mirror': 8 },
  { feature: 'Rechargeable', 'Soap Dispenser': 28, 'Mirror': 22 },
  { feature: 'Stainless Steel', 'Trash Can': 25, 'Soap Dispenser': 15, 'Paper Towel': 5, 'Dish Rack': 18 },
  { feature: 'Compact Design', 'Trash Can': 18, 'Soap Dispenser': 24, 'Mirror': 14 },
];