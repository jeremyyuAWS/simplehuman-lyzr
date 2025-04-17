import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from 'recharts';
import { BsArrowUp, BsArrowDown, BsAward } from 'react-icons/bs';
import { motion } from 'framer-motion';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const ABTestingDashboard: React.FC = () => {
  const [activeTest, setActiveTest] = useState<'welcome' | 'product' | 'troubleshooting'>('welcome');

  // Mock data for Welcome Message A/B test
  const welcomeTestData = {
    metrics: [
      { name: 'Conversation Rate', A: 68, B: 74 },
      { name: 'Engagement Time (sec)', A: 124, B: 142 },
      { name: 'Click-through Rate', A: 42, B: 51 },
      { name: 'Task Completion', A: 71, B: 76 }
    ],
    timeSeriesData: [
      { day: 'Day 1', A: 62, B: 70 },
      { day: 'Day 2', A: 65, B: 72 },
      { day: 'Day 3', A: 68, B: 73 },
      { day: 'Day 4', A: 67, B: 75 },
      { day: 'Day 5', A: 70, B: 76 },
      { day: 'Day 6', A: 72, B: 74 },
      { day: 'Day 7', A: 68, B: 74 }
    ],
    variantDetails: {
      A: {
        name: "Standard Welcome",
        description: "Hello! I'm the Simplehuman Smart Assistant. What brings you here today?",
        stats: { impressions: 2450, interactions: 1666, completions: 1180 }
      },
      B: {
        name: "Personalized Welcome",
        description: "Hi there! I'm your Simplehuman Smart Assistant. I can help you find the perfect products, troubleshoot issues, or assist with orders. What can I help with today?",
        stats: { impressions: 2430, interactions: 1798, completions: 1371 }
      }
    }
  };

  // Mock data for Product Recommendation A/B test
  const productTestData = {
    metrics: [
      { name: 'Click Rate', A: 23, B: 31 },
      { name: 'Conversion Rate', A: 8, B: 12 },
      { name: 'Add to Cart', A: 15, B: 21 },
      { name: 'Engagement Time (sec)', A: 98, B: 127 }
    ],
    timeSeriesData: [
      { day: 'Day 1', A: 21, B: 28 },
      { day: 'Day 2', A: 22, B: 29 },
      { day: 'Day 3', A: 24, B: 30 },
      { day: 'Day 4', A: 23, B: 32 },
      { day: 'Day 5', A: 25, B: 33 },
      { day: 'Day 6', A: 26, B: 32 },
      { day: 'Day 7', A: 23, B: 31 }
    ],
    variantDetails: {
      A: {
        name: "Text-only Recommendations",
        description: "Simple text descriptions of product recommendations",
        stats: { impressions: 1840, interactions: 423, conversions: 147 }
      },
      B: {
        name: "Visual Product Cards",
        description: "Rich product cards with images, features, and price",
        stats: { impressions: 1820, interactions: 564, conversions: 218 }
      }
    }
  };

  // Mock data for Troubleshooting A/B test
  const troubleshootingTestData = {
    metrics: [
      { name: 'Problem Resolution Rate', A: 61, B: 75 },
      { name: 'Steps Completed', A: 3.2, B: 4.1 },
      { name: 'User Satisfaction', A: 72, B: 84 },
      { name: 'Time to Resolution (sec)', A: 186, B: 142 }
    ],
    timeSeriesData: [
      { day: 'Day 1', A: 58, B: 72 },
      { day: 'Day 2', A: 60, B: 73 },
      { day: 'Day 3', A: 62, B: 74 },
      { day: 'Day 4', A: 63, B: 76 },
      { day: 'Day 5', A: 62, B: 77 },
      { day: 'Day 6', A: 61, B: 75 },
      { day: 'Day 7', A: 61, B: 75 }
    ],
    variantDetails: {
      A: {
        name: "Text Instructions",
        description: "Plain text troubleshooting instructions",
        stats: { impressions: 1240, resolutions: 756, handoffs: 484 }
      },
      B: {
        name: "Step-by-Step Cards",
        description: "Visual step cards with animations and progress indicators",
        stats: { impressions: 1220, resolutions: 915, handoffs: 305 }
      }
    }
  };

  const getActiveTestData = () => {
    switch (activeTest) {
      case 'welcome':
        return welcomeTestData;
      case 'product':
        return productTestData;
      case 'troubleshooting':
        return troubleshootingTestData;
      default:
        return welcomeTestData;
    }
  };

  const activeData = getActiveTestData();
  
  const calculateImprovement = (metricName: string) => {
    const metric = activeData.metrics.find(m => m.name === metricName);
    if (!metric) return { value: 0, percentage: 0 };
    
    const improvement = metric.B - metric.A;
    const percentage = metric.A > 0 ? (improvement / metric.A) * 100 : 0;
    
    return { value: improvement, percentage: percentage };
  };

  // Calculate statistical significance (this is a simplified mock calculation)
  const calculateSignificance = (metricName: string) => {
    // In a real implementation, this would use proper statistical tests
    const improvement = calculateImprovement(metricName);
    return Math.abs(improvement.percentage) > 5 ? 'Significant' : 'Not Significant';
  };

  const getTestName = () => {
    switch (activeTest) {
      case 'welcome':
        return 'Welcome Message Test';
      case 'product': 
        return 'Product Recommendation Test';
      case 'troubleshooting':
        return 'Troubleshooting Flow Test';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">A/B Testing Dashboard</h2>
        
        <div className="flex space-x-2">
          <button 
            className={`px-3 py-1 text-sm rounded-md transition ${activeTest === 'welcome' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setActiveTest('welcome')}
          >
            Welcome Message
          </button>
          <button 
            className={`px-3 py-1 text-sm rounded-md transition ${activeTest === 'product' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setActiveTest('product')}
          >
            Product Recommendations
          </button>
          <button 
            className={`px-3 py-1 text-sm rounded-md transition ${activeTest === 'troubleshooting' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setActiveTest('troubleshooting')}
          >
            Troubleshooting
          </button>
        </div>
      </div>

      {/* Test Summary */}
      <motion.div
        className="bg-white rounded-lg p-4 shadow-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        key={activeTest}
      >
        <div className="flex items-center mb-4">
          <h3 className="text-lg font-medium text-gray-800">{getTestName()}</h3>
          <span className="ml-4 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">Running - Day 7 of 14</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Variant A */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-800">Variant A: {activeData.variantDetails.A.name}</h4>
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">Control</span>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              "{activeData.variantDetails.A.description}"
            </p>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-white p-2 rounded-md">
                <div className="text-sm text-gray-500">Impressions</div>
                <div className="font-bold text-gray-800">{activeData.variantDetails.A.stats.impressions.toLocaleString()}</div>
              </div>
              <div className="bg-white p-2 rounded-md">
                <div className="text-sm text-gray-500">Interactions</div>
                <div className="font-bold text-gray-800">{activeData.variantDetails.A.stats.interactions?.toLocaleString() || '-'}</div>
              </div>
              <div className="bg-white p-2 rounded-md">
                <div className="text-sm text-gray-500">{activeTest === 'troubleshooting' ? 'Resolutions' : 'Completions'}</div>
                <div className="font-bold text-gray-800">
                  {activeTest === 'troubleshooting' 
                    ? activeData.variantDetails.A.stats.resolutions?.toLocaleString() 
                    : activeData.variantDetails.A.stats.completions?.toLocaleString() || 
                      activeData.variantDetails.A.stats.conversions?.toLocaleString() || '-'}
                </div>
              </div>
            </div>
          </div>
          
          {/* Variant B */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-800">Variant B: {activeData.variantDetails.B.name}</h4>
              <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">Test Variant</span>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              "{activeData.variantDetails.B.description}"
            </p>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-white p-2 rounded-md">
                <div className="text-sm text-gray-500">Impressions</div>
                <div className="font-bold text-gray-800">{activeData.variantDetails.B.stats.impressions.toLocaleString()}</div>
              </div>
              <div className="bg-white p-2 rounded-md">
                <div className="text-sm text-gray-500">Interactions</div>
                <div className="font-bold text-gray-800">{activeData.variantDetails.B.stats.interactions?.toLocaleString() || '-'}</div>
              </div>
              <div className="bg-white p-2 rounded-md">
                <div className="text-sm text-gray-500">{activeTest === 'troubleshooting' ? 'Resolutions' : 'Completions'}</div>
                <div className="font-bold text-gray-800">
                  {activeTest === 'troubleshooting' 
                    ? activeData.variantDetails.B.stats.resolutions?.toLocaleString() 
                    : activeData.variantDetails.B.stats.completions?.toLocaleString() || 
                      activeData.variantDetails.B.stats.conversions?.toLocaleString() || '-'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Metrics Comparison */}
      <motion.div 
        className="bg-white rounded-lg p-4 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        key={`metrics-${activeTest}`}
      >
        <h3 className="text-lg font-medium text-gray-800 mb-4">Performance Comparison</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={activeData.metrics}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="A" name="Variant A" fill="#8884d8" />
              <Bar dataKey="B" name="Variant B" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
      
      {/* Performance Over Time */}
      <motion.div 
        className="bg-white rounded-lg p-4 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        key={`time-series-${activeTest}`}
      >
        <h3 className="text-lg font-medium text-gray-800 mb-4">Performance Over Time</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={activeData.timeSeriesData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="A" name="Variant A" stroke="#8884d8" />
              <Line type="monotone" dataKey="B" name="Variant B" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
      
      {/* Key Insights */}
      <motion.div 
        className="bg-white rounded-lg p-4 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        key={`insights-${activeTest}`}
      >
        <div className="flex items-center mb-4">
          <h3 className="text-lg font-medium text-gray-800">Key Insights</h3>
          <div className="bg-yellow-100 p-2 rounded-full ml-2">
            <BsAward className="text-yellow-600" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Metric Improvements</h4>
            <div className="space-y-3">
              {activeData.metrics.map((metric, index) => {
                const improvement = calculateImprovement(metric.name);
                const isPositive = improvement.percentage > 0;
                return (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">{metric.name}</span>
                      <div className="flex items-center">
                        {isPositive ? (
                          <BsArrowUp className="text-green-600 text-xs mr-1" />
                        ) : (
                          <BsArrowDown className="text-red-600 text-xs mr-1" />
                        )}
                        <span className={`text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                          {Math.abs(improvement.percentage).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                      <div 
                        className={`h-1.5 rounded-full ${isPositive ? 'bg-green-500' : 'bg-red-500'}`} 
                        style={{ width: `${Math.min(Math.abs(improvement.percentage), 100)}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Statistical Significance</h4>
            <div className="space-y-3">
              {activeData.metrics.map((metric, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-lg flex justify-between items-center">
                  <span className="text-sm text-gray-700">{metric.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    calculateSignificance(metric.name) === 'Significant' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {calculateSignificance(metric.name)}
                  </span>
                </div>
              ))}
            </div>
            
            {/* Recommendation */}
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-1">Recommendation</h4>
              <p className="text-sm text-blue-700">
                {activeTest === 'welcome' && "Variant B shows significantly better engagement. Consider implementing the personalized welcome message."}
                {activeTest === 'product' && "Variant B with visual product cards significantly outperforms text-only recommendations. Implement across all product flows."}
                {activeTest === 'troubleshooting' && "Variant B with step-by-step cards shows 23% better resolution rates. Implement this format for all troubleshooting flows."}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};