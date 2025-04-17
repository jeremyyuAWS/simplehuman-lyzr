import React, { useState } from 'react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area, AreaChart, RadarChart,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Treemap
} from 'recharts';
import { motion } from 'framer-motion';
import { 
  BsBarChartFill, BsCashCoin, BsClockHistory, BsPeople, 
  BsPersonCircle, BsGeoAlt, BsCreditCard2Front, BsHouseDoor, 
  BsGraphUp, BsPerson, BsPersonFill, BsFilter, BsLightningCharge,
  BsChatLeftText, BsArrowReturnLeft, BsAward, BsTools, BsShieldCheck,
  BsRecycle, BsTag, BsFileEarmarkCheck, BsQuestionCircle, BsRobot
} from 'react-icons/bs';
import { ConversationSimulator } from './ConversationSimulator';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

export const DeflectionMetrics: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter'>('month');
  const [activeSegment, setActiveSegment] = useState<string>('premium-home');
  const [activeConversation, setActiveConversation] = useState<string>('product-return');

  // Mock data for ticket deflection over time
  const getDeflectionTimeData = () => {
    if (timeRange === 'week') {
      return [
        { date: 'Mon', deflected: 42, manual: 18 },
        { date: 'Tue', deflected: 38, manual: 15 },
        { date: 'Wed', deflected: 45, manual: 17 },
        { date: 'Thu', deflected: 51, manual: 20 },
        { date: 'Fri', deflected: 47, manual: 19 },
        { date: 'Sat', deflected: 28, manual: 12 },
        { date: 'Sun', deflected: 25, manual: 10 }
      ];
    } else if (timeRange === 'month') {
      return [
        { date: 'Week 1', deflected: 224, manual: 86 },
        { date: 'Week 2', deflected: 276, manual: 94 },
        { date: 'Week 3', deflected: 312, manual: 106 },
        { date: 'Week 4', deflected: 298, manual: 98 }
      ];
    } else {
      return [
        { date: 'Jan', deflected: 842, manual: 358 },
        { date: 'Feb', deflected: 932, manual: 372 },
        { date: 'Mar', deflected: 1102, manual: 398 }
      ];
    }
  };

  // Mock data for deflection by category
  const deflectionByCategory = [
    { name: 'Product Info', deflected: 38, manual: 12 },
    { name: 'Troubleshooting', deflected: 28, manual: 22 },
    { name: 'Order Status', deflected: 45, manual: 5 },
    { name: 'Returns', deflected: 15, manual: 25 },
    { name: 'Warranty', deflected: 18, manual: 22 }
  ];

  // Mock data for cost savings
  const costSavingsData = [
    { month: 'Jan', savings: 12500 },
    { month: 'Feb', savings: 13800 },
    { month: 'Mar', savings: 16500 },
    { month: 'Apr', savings: 14700 },
    { month: 'May', savings: 18200 },
    { month: 'Jun', savings: 17800 }
  ];

  // Mock data for resolution time comparison
  const resolutionTimeData = [
    { category: 'Product Info', chatbot: 45, human: 180 },
    { category: 'Troubleshooting', chatbot: 120, human: 420 },
    { category: 'Order Status', chatbot: 30, human: 150 },
    { category: 'Returns', chatbot: 90, human: 240 },
    { category: 'Warranty', chatbot: 75, human: 300 }
  ];

  // Mock data for customer cohorts and segments (inspired by Ezra Tapestry)
  const customerCohorts = [
    { 
      id: 'premium-home',
      name: 'Premium Home Enthusiasts', 
      percentage: 32, 
      avgIncome: 125000,
      avgSpend: 284,
      ageGroup: '35-54',
      preferredProducts: ['Sensor Mirrors', 'Voice Control Trash Cans'],
      locations: ['Urban Centers', 'Affluent Suburbs'],
      deflectionRate: 84,
      netWorth: 760000,
      householdBudget: 140,
      diversity: 68
    },
    { 
      id: 'design-focused',
      name: 'Design-Focused Millennials', 
      percentage: 28, 
      avgIncome: 86500,
      avgSpend: 212,
      ageGroup: '25-34',
      preferredProducts: ['Slim Profile Trash Cans', 'Soap Dispensers'],
      locations: ['Metro Areas', 'Tech Hubs'],
      deflectionRate: 76,
      netWorth: 320000,
      householdBudget: 115,
      diversity: 72
    },
    { 
      id: 'practical-tech',
      name: 'Practical Tech Adopters', 
      percentage: 24, 
      avgIncome: 74000,
      avgSpend: 175,
      ageGroup: '40-65',
      preferredProducts: ['Motion Sensor Products', 'Wall-Mounted Solutions'],
      locations: ['Suburban', 'Small Cities'],
      deflectionRate: 62,
      netWorth: 410000,
      householdBudget: 105,
      diversity: 58
    },
    { 
      id: 'eco-conscious',
      name: 'Eco-Conscious Families', 
      percentage: 16, 
      avgIncome: 92000,
      avgSpend: 196,
      ageGroup: '30-45',
      preferredProducts: ['Recycling Solutions', 'Stainless Steel Products'],
      locations: ['Progressive Urban', 'College Towns'],
      deflectionRate: 72,
      netWorth: 385000,
      householdBudget: 125,
      diversity: 82
    }
  ];

  // Mock data for segment demographic information
  const getSegmentDemographics = (segmentId: string) => {
    const segmentDemographicsData = {
      'premium-home': {
        ageDistribution: [
          { age: '18-24', male: 2, female: 3 },
          { age: '25-34', male: 8, female: 10 },
          { age: '35-44', male: 18, female: 16 },
          { age: '45-54', male: 14, female: 13 },
          { age: '55-64', male: 9, female: 8 },
          { age: '65+', male: 4, female: 5 }
        ],
        ethnicityDistribution: [
          { name: 'White', value: 62 },
          { name: 'Asian', value: 18 },
          { name: 'Hispanic', value: 10 },
          { name: 'Black', value: 7 },
          { name: 'Other', value: 3 }
        ],
        householdBudget: [
          { category: 'Housing', index: 155 },
          { category: 'Food', index: 128 },
          { category: 'Transportation', index: 110 },
          { category: 'Healthcare', index: 135 },
          { category: 'Entertainment', index: 172 },
          { category: 'Apparel', index: 165 },
          { category: 'Home Improvement', index: 185 },
        ],
        occupationDistribution: [
          { name: 'Management', value: 28, size: 28000 },
          { name: 'Business/Financial', value: 22, size: 22000 },
          { name: 'Healthcare', value: 15, size: 15000 },
          { name: 'Tech', value: 18, size: 18000 },
          { name: 'Legal', value: 8, size: 8000 },
          { name: 'Other', value: 9, size: 9000 }
        ]
      },
      'design-focused': {
        ageDistribution: [
          { age: '18-24', male: 12, female: 15 },
          { age: '25-34', male: 22, female: 24 },
          { age: '35-44', male: 10, female: 11 },
          { age: '45-54', male: 5, female: 4 },
          { age: '55-64', male: 1, female: 1 },
          { age: '65+', male: 0, female: 0 }
        ],
        ethnicityDistribution: [
          { name: 'White', value: 52 },
          { name: 'Asian', value: 20 },
          { name: 'Hispanic', value: 15 },
          { name: 'Black', value: 10 },
          { name: 'Other', value: 3 }
        ],
        householdBudget: [
          { category: 'Housing', index: 162 },
          { category: 'Food', index: 140 },
          { category: 'Transportation', index: 95 },
          { category: 'Healthcare', index: 105 },
          { category: 'Entertainment', index: 158 },
          { category: 'Apparel', index: 175 },
          { category: 'Home Improvement', index: 148 },
        ],
        occupationDistribution: [
          { name: 'Creative', value: 24, size: 24000 },
          { name: 'Tech', value: 26, size: 26000 },
          { name: 'Marketing', value: 18, size: 18000 },
          { name: 'Education', value: 12, size: 12000 },
          { name: 'Sales', value: 10, size: 10000 },
          { name: 'Other', value: 10, size: 10000 }
        ]
      },
      'practical-tech': {
        ageDistribution: [
          { age: '18-24', male: 1, female: 1 },
          { age: '25-34', male: 5, female: 6 },
          { age: '35-44', male: 12, female: 14 },
          { age: '45-54', male: 16, female: 17 },
          { age: '55-64', male: 14, female: 13 },
          { age: '65+', male: 9, female: 8 }
        ],
        ethnicityDistribution: [
          { name: 'White', value: 68 },
          { name: 'Hispanic', value: 12 },
          { name: 'Black', value: 10 },
          { name: 'Asian', value: 7 },
          { name: 'Other', value: 3 }
        ],
        householdBudget: [
          { category: 'Housing', index: 112 },
          { category: 'Food', index: 105 },
          { category: 'Transportation', index: 115 },
          { category: 'Healthcare', index: 124 },
          { category: 'Entertainment', index: 98 },
          { category: 'Apparel', index: 85 },
          { category: 'Home Improvement', index: 132 },
        ],
        occupationDistribution: [
          { name: 'Office Admin', value: 18, size: 18000 },
          { name: 'Education', value: 15, size: 15000 },
          { name: 'Healthcare', value: 14, size: 14000 },
          { name: 'Skilled Trades', value: 20, size: 20000 },
          { name: 'Retail', value: 12, size: 12000 },
          { name: 'Other', value: 21, size: 21000 }
        ]
      },
      'eco-conscious': {
        ageDistribution: [
          { age: '18-24', male: 6, female: 8 },
          { age: '25-34', male: 15, female: 18 },
          { age: '35-44', male: 12, female: 14 },
          { age: '45-54', male: 8, female: 9 },
          { age: '55-64', male: 5, female: 6 },
          { age: '65+', male: 2, female: 2 }
        ],
        ethnicityDistribution: [
          { name: 'White', value: 58 },
          { name: 'Asian', value: 14 },
          { name: 'Hispanic', value: 16 },
          { name: 'Black', value: 9 },
          { name: 'Other', value: 3 }
        ],
        householdBudget: [
          { category: 'Housing', index: 132 },
          { category: 'Food', index: 145 },
          { category: 'Transportation', index: 102 },
          { category: 'Healthcare', index: 118 },
          { category: 'Entertainment', index: 108 },
          { category: 'Apparel', index: 95 },
          { category: 'Home Improvement', index: 152 },
        ],
        occupationDistribution: [
          { name: 'Education', value: 22, size: 22000 },
          { name: 'Non-profit', value: 18, size: 18000 },
          { name: 'Healthcare', value: 16, size: 16000 },
          { name: 'Tech', value: 14, size: 14000 },
          { name: 'Government', value: 12, size: 12000 },
          { name: 'Other', value: 18, size: 18000 }
        ]
      }
    };
    
    return segmentDemographicsData[segmentId as keyof typeof segmentDemographicsData];
  };

  // Mock data for segment feature preferences 
  const getSegmentFeaturePreferences = (segmentId: string) => {
    const featurePreferencesData = {
      'premium-home': [
        { feature: 'Design', value: 90 },
        { feature: 'Smart Features', value: 85 },
        { feature: 'Premium Materials', value: 95 },
        { feature: 'Warranty', value: 75 },
        { feature: 'Eco-Friendly', value: 60 },
        { feature: 'Space Saving', value: 65 }
      ],
      'design-focused': [
        { feature: 'Design', value: 98 },
        { feature: 'Smart Features', value: 75 },
        { feature: 'Premium Materials', value: 82 },
        { feature: 'Warranty', value: 60 },
        { feature: 'Eco-Friendly', value: 85 },
        { feature: 'Space Saving', value: 88 }
      ],
      'practical-tech': [
        { feature: 'Design', value: 65 },
        { feature: 'Smart Features', value: 80 },
        { feature: 'Premium Materials', value: 70 },
        { feature: 'Warranty', value: 90 },
        { feature: 'Eco-Friendly', value: 55 },
        { feature: 'Space Saving', value: 75 }
      ],
      'eco-conscious': [
        { feature: 'Design', value: 75 },
        { feature: 'Smart Features', value: 65 },
        { feature: 'Premium Materials', value: 68 },
        { feature: 'Warranty', value: 78 },
        { feature: 'Eco-Friendly', value: 98 },
        { feature: 'Space Saving', value: 82 }
      ]
    };
    
    return featurePreferencesData[segmentId as keyof typeof featurePreferencesData];
  };

  // Calculate deflection rate
  const calculateDeflectionRate = () => {
    const data = getDeflectionTimeData();
    let totalDeflected = 0;
    let totalTickets = 0;
    
    data.forEach(item => {
      totalDeflected += item.deflected;
      totalTickets += (item.deflected + item.manual);
    });
    
    return (totalDeflected / totalTickets * 100).toFixed(1);
  };

  // Calculate cost savings
  const calculateCostSavings = () => {
    const data = getDeflectionTimeData();
    let totalDeflected = 0;
    
    data.forEach(item => {
      totalDeflected += item.deflected;
    });
    
    // Assuming $15 cost per human-handled ticket
    return (totalDeflected * 15).toLocaleString();
  };

  // Calculate time saved
  const calculateTimeSaved = () => {
    const data = getDeflectionTimeData();
    let totalDeflected = 0;
    
    data.forEach(item => {
      totalDeflected += item.deflected;
    });
    
    // Assuming average of 8 minutes saved per ticket
    const minutesSaved = totalDeflected * 8;
    const hoursSaved = Math.floor(minutesSaved / 60);
    
    return `${hoursSaved} hours`;
  };

  // Format demographics data for display
  const formatAgeData = (data: any[]) => {
    return data.map(item => ({
      age: item.age,
      male: -item.male, // Negative values for left side of pyramid
      female: item.female
    }));
  };

  // Get current active segment
  const currentSegment = customerCohorts.find(cohort => cohort.id === activeSegment) || customerCohorts[0];
  
  // Get segment demographics
  const segmentDemographics = getSegmentDemographics(activeSegment);
  
  // Get segment feature preferences
  const featurePreferences = getSegmentFeaturePreferences(activeSegment);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Support Deflection Metrics</h2>
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 text-sm rounded-md transition ${timeRange === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setTimeRange('week')}
          >
            Week
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-md transition ${timeRange === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setTimeRange('month')}
          >
            Month
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-md transition ${timeRange === 'quarter' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setTimeRange('quarter')}
          >
            Quarter
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div 
          className="bg-white rounded-lg p-4 shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Deflection Rate</p>
              <h3 className="text-2xl font-bold text-gray-800">{calculateDeflectionRate()}%</h3>
            </div>
            <div className="bg-blue-100 p-2 rounded-lg">
              <BsBarChartFill className="text-blue-600 text-xl" />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-2">↑ 3.2% from previous period</p>
        </motion.div>
        
        <motion.div 
          className="bg-white rounded-lg p-4 shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Cost Savings</p>
              <h3 className="text-2xl font-bold text-gray-800">${calculateCostSavings()}</h3>
            </div>
            <div className="bg-green-100 p-2 rounded-lg">
              <BsCashCoin className="text-green-600 text-xl" />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-2">↑ 8.1% from previous period</p>
        </motion.div>
        
        <motion.div 
          className="bg-white rounded-lg p-4 shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Agent Time Saved</p>
              <h3 className="text-2xl font-bold text-gray-800">{calculateTimeSaved()}</h3>
            </div>
            <div className="bg-purple-100 p-2 rounded-lg">
              <BsClockHistory className="text-purple-600 text-xl" />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-2">↑ 5.6% from previous period</p>
        </motion.div>
      </div>

      {/* Conversation Simulator Section */}
      <motion.div 
        className="bg-white rounded-lg p-4 shadow-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-800">Chatbot Conversation Examples</h3>
          <div className="flex space-x-2">
            <button
              className={`px-3 py-1 text-sm rounded-md transition ${activeConversation === 'product-return' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setActiveConversation('product-return')}
            >
              <BsArrowReturnLeft className="inline mr-1" />
              Returns
            </button>
            <button
              className={`px-3 py-1 text-sm rounded-md transition ${activeConversation === 'warranty-registration' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setActiveConversation('warranty-registration')}
            >
              <BsShieldCheck className="inline mr-1" />
              Warranty
            </button>
            <button
              className={`px-3 py-1 text-sm rounded-md transition ${activeConversation === 'refurbished-offer' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setActiveConversation('refurbished-offer')}
            >
              <BsRecycle className="inline mr-1" />
              Refurbished
            </button>
            <button
              className={`px-3 py-1 text-sm rounded-md transition ${activeConversation === 'troubleshooting' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setActiveConversation('troubleshooting')}
            >
              <BsTools className="inline mr-1" />
              Troubleshooting
            </button>
            <button
              className={`px-3 py-1 text-sm rounded-md transition ${activeConversation === 'dual-compartment-inquiry' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setActiveConversation('dual-compartment-inquiry')}
            >
              <BsQuestionCircle className="inline mr-1" />
              Product Inquiry
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="h-[500px]">
            <ConversationSimulator scenarioId={activeConversation} />
          </div>
        </div>
      </motion.div>

      {/* Ticket Deflection Over Time */}
      <motion.div 
        className="bg-white rounded-lg p-4 shadow-sm"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        key={`time-${timeRange}`}
      >
        <h3 className="text-lg font-medium text-gray-800 mb-4">Ticket Deflection Over Time</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={getDeflectionTimeData()}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              stackOffset="expand"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} />
              <Tooltip formatter={(value, name) => [
                `${(typeof value === 'number' ? value : 0).toLocaleString()} tickets`,
                name === "deflected" ? "AI Handled" : "Human Handled"
              ]} />
              <Legend 
                formatter={(value) => value === "deflected" ? "AI Handled" : "Human Handled"}
              />
              <Area 
                type="monotone" 
                dataKey="deflected" 
                stackId="1" 
                stroke="#82ca9d" 
                fill="#82ca9d" 
                name="deflected"
              />
              <Area 
                type="monotone" 
                dataKey="manual" 
                stackId="1" 
                stroke="#8884d8" 
                fill="#8884d8" 
                name="manual"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Deflection by Category */}
        <motion.div 
          className="bg-white rounded-lg p-4 shadow-sm"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-lg font-medium text-gray-800 mb-4">Deflection by Category</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={deflectionByCategory}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Legend />
                <Bar dataKey="deflected" name="AI Handled" stackId="a" fill="#82ca9d" />
                <Bar dataKey="manual" name="Human Handled" stackId="a" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
        
        {/* Cost Savings Over Time */}
        <motion.div 
          className="bg-white rounded-lg p-4 shadow-sm"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-lg font-medium text-gray-800 mb-4">Cost Savings Over Time</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={costSavingsData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Cost Savings']} />
                <Area 
                  type="monotone" 
                  dataKey="savings" 
                  stroke="#82ca9d" 
                  fill="#82ca9d"
                  name="Cost Savings" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Resolution Time Comparison */}
      <motion.div 
        className="bg-white rounded-lg p-4 shadow-sm"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
      >
        <h3 className="text-lg font-medium text-gray-800 mb-4">Resolution Time Comparison (seconds)</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={resolutionTimeData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value} seconds`, 'Resolution Time']} />
              <Legend />
              <Bar dataKey="chatbot" name="Chatbot Resolution" fill="#82ca9d" />
              <Bar dataKey="human" name="Human Agent Resolution" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
      
      {/* Market Segmentation & Cohort Targeting Section */}
      <motion.div 
        className="bg-white rounded-lg p-4 shadow-sm"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <h3 className="text-lg font-medium text-gray-800">Market Segmentation & Cohort Targeting</h3>
            <span className="ml-2 px-2.5 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded">
              Enhanced with Data Enrichment
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Powered by</span>
            <div className="text-sm font-semibold text-gray-700 bg-gray-100 px-2 py-1 rounded flex items-center">
              <span className="mr-1">TAPESTRY</span>
              <span className="text-green-600">SEGMENTATION</span>
            </div>
          </div>
        </div>

        {/* Segment selectors */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
          {customerCohorts.map((cohort) => (
            <motion.div
              key={cohort.id}
              className={`p-3 rounded-lg cursor-pointer transition-colors ${activeSegment === cohort.id ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-50 text-gray-800 hover:bg-gray-100'}`}
              onClick={() => setActiveSegment(cohort.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className={`font-medium ${activeSegment === cohort.id ? 'text-white' : 'text-gray-800'}`}>
                    {cohort.name}
                  </h4>
                  <p className={`text-xs ${activeSegment === cohort.id ? 'text-blue-100' : 'text-gray-500'}`}>
                    {cohort.percentage}% of customer base
                  </p>
                </div>
                <div className={`text-xs font-medium px-1.5 py-0.5 rounded ${activeSegment === cohort.id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                  {cohort.deflectionRate}% deflection
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Cohort Profile & Statistics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          {/* Left column - core demographics */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Age Distribution Chart */}
              <motion.div 
                className="bg-gray-50 p-3 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                key={`age-${activeSegment}`}
              >
                <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <BsPersonFill className="mr-1.5 text-gray-500" />
                  Age Distribution ({currentSegment.ageGroup})
                </h4>
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={formatAgeData(segmentDemographics.ageDistribution)}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        type="number" 
                        tickFormatter={(value) => `${Math.abs(value)}%`}
                      />
                      <YAxis type="category" dataKey="age" />
                      <Tooltip 
                        formatter={(value) => [`${Math.abs(value)}%`, value < 0 ? 'Male' : 'Female']}
                      />
                      <Bar 
                        dataKey="male" 
                        name="Male" 
                        fill="#8884d8" 
                        radius={[4, 0, 0, 4]}
                      />
                      <Bar 
                        dataKey="female" 
                        name="Female" 
                        fill="#82ca9d" 
                        radius={[0, 4, 4, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              {/* Ethnicity Distribution */}
              <motion.div 
                className="bg-gray-50 p-3 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                key={`ethnicity-${activeSegment}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-gray-700 flex items-center">
                    <BsPeople className="mr-1.5 text-gray-500" />
                    Ethnicity Distribution
                  </h4>
                  <div className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-800 flex items-center">
                    Diversity: {currentSegment.diversity}/100
                  </div>
                </div>
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={segmentDemographics.ethnicityDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                        labelLine={false}
                      >
                        {segmentDemographics.ethnicityDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              {/* Household Budget Index */}
              <motion.div 
                className="bg-gray-50 p-3 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                key={`budget-${activeSegment}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-gray-700 flex items-center">
                    <BsCreditCard2Front className="mr-1.5 text-gray-500" />
                    Household Budget Index
                  </h4>
                  <div className="text-xs font-semibold px-2 py-0.5 rounded bg-green-100 text-green-800">
                    {currentSegment.householdBudget} (US Avg: 100)
                  </div>
                </div>
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={segmentDemographics.householdBudget}
                      margin={{ top: 5, right: 30, left: 5, bottom: 5 }}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 200]} />
                      <YAxis dataKey="category" type="category" width={100} />
                      <Tooltip 
                        formatter={(value) => [`Index: ${value}`, 'Spending Index']}
                        labelFormatter={(label) => `Category: ${label}`}
                      />
                      <Bar 
                        dataKey="index" 
                        fill="#8884d8"
                        name="Spending Index" 
                        radius={[0, 4, 4, 0]}
                      >
                        {segmentDemographics.householdBudget.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.index > 130 ? '#82ca9d' : (entry.index < 100 ? '#ffc658' : '#8884d8')} 
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              {/* Occupation Distribution */}
              <motion.div 
                className="bg-gray-50 p-3 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                key={`occupation-${activeSegment}`}
              >
                <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <BsHouseDoor className="mr-1.5 text-gray-500" />
                  Occupation Distribution
                </h4>
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <Treemap
                      data={segmentDemographics.occupationDistribution}
                      dataKey="size"
                      aspectRatio={4/3}
                      stroke="#fff"
                      fill="#8884d8"
                      content={({ root, depth, x, y, width, height, index, payload, colors, rank, name }) => {
                        return (
                          <g>
                            <rect
                              x={x}
                              y={y}
                              width={width}
                              height={height}
                              style={{
                                fill: COLORS[index % COLORS.length],
                                stroke: '#fff',
                                strokeWidth: 2,
                                strokeOpacity: 1,
                              }}
                            />
                            {width > 50 && height > 30 && (
                              <text
                                x={x + width / 2}
                                y={y + height / 2}
                                textAnchor="middle"
                                fill="#fff"
                                fontSize={12}
                              >
                                {name}
                              </text>
                            )}
                          </g>
                        );
                      }}
                    >
                      <Tooltip 
                        formatter={(value, name, props) => [`${props.payload.value}%`, props.payload.name]} 
                      />
                    </Treemap>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right column - feature preferences and demographics summary */}
          <div className="lg:col-span-4 space-y-6">
            {/* Segment Profile Summary */}
            <motion.div 
              className="bg-gray-50 p-4 rounded-lg"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              key={`summary-${activeSegment}`}
            >
              <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                <div className="w-2 h-8 bg-blue-500 mr-2 rounded-full"></div>
                {currentSegment.name}
              </h4>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                  <span className="text-sm text-gray-600 flex items-center">
                    <BsPersonCircle className="mr-1.5 text-gray-400" />
                    Average Income
                  </span>
                  <span className="font-medium text-gray-800">${currentSegment.avgIncome.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                  <span className="text-sm text-gray-600 flex items-center">
                    <BsCreditCard2Front className="mr-1.5 text-gray-400" />
                    Average Spend
                  </span>
                  <span className="font-medium text-gray-800">${currentSegment.avgSpend}</span>
                </div>
                
                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                  <span className="text-sm text-gray-600 flex items-center">
                    <BsHouseDoor className="mr-1.5 text-gray-400" />
                    Net Worth
                  </span>
                  <span className="font-medium text-gray-800">${currentSegment.netWorth.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                  <span className="text-sm text-gray-600 flex items-center">
                    <BsGeoAlt className="mr-1.5 text-gray-400" />
                    Prime Locations
                  </span>
                  <div className="flex flex-wrap justify-end">
                    {currentSegment.locations.map((location, index) => (
                      <span 
                        key={location} 
                        className="text-xs bg-gray-200 rounded-full px-2 py-0.5 ml-1 mb-1 text-gray-700"
                      >
                        {location}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-600 mb-2 flex items-center">
                    <BsFilter className="mr-1.5 text-gray-400" />
                    Preferred Products
                  </div>
                  <div className="flex flex-wrap">
                    {currentSegment.preferredProducts.map((product, index) => (
                      <span 
                        key={product} 
                        className="text-xs bg-blue-100 text-blue-800 rounded-full px-2 py-0.5 mr-1 mb-1"
                      >
                        {product}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Feature Preferences Radar */}
            <motion.div 
              className="bg-gray-50 p-3 rounded-lg"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              key={`radar-${activeSegment}`}
            >
              <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                <BsLightningCharge className="mr-1.5 text-gray-500" />
                Feature Preferences
              </h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart 
                    cx="50%" 
                    cy="50%" 
                    outerRadius="80%" 
                    data={featurePreferences}
                  >
                    <PolarGrid />
                    <PolarAngleAxis dataKey="feature" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar
                      name={currentSegment.name}
                      dataKey="value"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.6}
                    />
                    <Tooltip formatter={(value) => [`${value}/100`, 'Importance']} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Cohort Targeting Strategy */}
        <motion.div 
          className="p-4 bg-blue-50 rounded-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          key={`strategy-${activeSegment}`}
        >
          <h4 className="font-medium text-blue-800 mb-3">Targeted Support Strategy for {currentSegment.name}</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <div className="flex items-center mb-2">
                <div className="bg-blue-100 p-1.5 rounded-full mr-2">
                  <BsBarChartFill className="text-blue-700 text-sm" />
                </div>
                <h5 className="font-medium text-gray-800">Response Customization</h5>
              </div>
              <p className="text-sm text-gray-600">
                {activeSegment === 'premium-home' && "Emphasize premium features and materials in chatbot responses. Use sophisticated language and focus on design aesthetics."}
                {activeSegment === 'design-focused' && "Highlight visual aspects and space-saving features. Use trendy terminology and reference design magazines and influences."}
                {activeSegment === 'practical-tech' && "Focus on functionality, durability, and warranty features. Use clear, straightforward language with practical examples."}
                {activeSegment === 'eco-conscious' && "Emphasize sustainability features, recycling capabilities, and eco-friendly materials. Reference environmental benefits."}
              </p>
            </div>
            
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <div className="flex items-center mb-2">
                <div className="bg-green-100 p-1.5 rounded-full mr-2">
                  <BsPersonCircle className="text-green-700 text-sm" />
                </div>
                <h5 className="font-medium text-gray-800">Support Channel Preference</h5>
              </div>
              <p className="text-sm text-gray-600">
                {activeSegment === 'premium-home' && "Prefer video demonstrations and visual troubleshooting. Offer priority support with dedicated agents when needed."}
                {activeSegment === 'design-focused' && "Use visual and interactive support methods. Social media integration and community-based solutions resonate well."}
                {activeSegment === 'practical-tech' && "Detailed step-by-step guides with minimal jargon. Phone support is still valued for complex issues."}
                {activeSegment === 'eco-conscious' && "Digital-first support with options to skip printing manuals/receipts. Video tutorials on maintaining product longevity."}
              </p>
            </div>
            
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <div className="flex items-center mb-2">
                <div className="bg-purple-100 p-1.5 rounded-full mr-2">
                  <BsGraphUp className="text-purple-700 text-sm" />
                </div>
                <h5 className="font-medium text-gray-800">Deflection Optimization</h5>
              </div>
              <p className="text-sm text-gray-600">
                {activeSegment === 'premium-home' && "Current deflection rate is strong at 84%. Focus on enhancing premium tier support with voice search and personalized responses."}
                {activeSegment === 'design-focused' && "76% deflection rate with room for improvement. Add more visual troubleshooting interfaces and interactive guides."}
                {activeSegment === 'practical-tech' && "Lower 62% deflection rate. Add more detailed technical information and step-by-step guides for common issues."}
                {activeSegment === 'eco-conscious' && "72% deflection rate. Enhance content about product longevity, maintenance, and sustainable practices."}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Customer Satisfaction Impact */}
      <motion.div 
        className="bg-white rounded-lg p-4 shadow-sm"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7 }}
      >
        <h3 className="text-lg font-medium text-gray-800 mb-4">Chatbot Impact on Customer Satisfaction</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-700">Response Time</h4>
              <div className="flex items-center">
                <span className="text-green-600 font-bold">-82%</span>
              </div>
            </div>
            <p className="text-sm text-gray-600">Average customer wait time reduced from 2.5 hours to 27 minutes.</p>
            <div className="mt-4 w-full bg-gray-200 h-2 rounded-full">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '82%' }}></div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-700">First Contact Resolution</h4>
              <div className="flex items-center">
                <span className="text-green-600 font-bold">+24%</span>
              </div>
            </div>
            <p className="text-sm text-gray-600">Issues resolved on first contact increased from 62% to 77%.</p>
            <div className="mt-4 w-full bg-gray-200 h-2 rounded-full">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '24%' }}></div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-700">Customer Effort Score</h4>
              <div className="flex items-center">
                <span className="text-green-600 font-bold">-31%</span>
              </div>
            </div>
            <p className="text-sm text-gray-600">Average effort score decreased from 3.2 to 2.2 (lower is better).</p>
            <div className="mt-4 w-full bg-gray-200 h-2 rounded-full">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '31%' }}></div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">Business Impact</h4>
          <p className="text-sm text-blue-700">
            The chatbot implementation has positively impacted overall CSAT scores by <span className="font-bold">+14 points</span>, 
            with a measurable increase in NPS of <span className="font-bold">+8 points</span>. Additionally, 
            customer retention has improved by <span className="font-bold">3.5%</span> among users who interact with the chatbot.
          </p>
        </div>
      </motion.div>
    </div>
  );
};