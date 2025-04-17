import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area,
  Treemap, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, RadarChart
} from 'recharts';
import { motion } from 'framer-motion';
import { 
  BsBarChartFill, BsCollection, BsTags, 
  BsGraphUp, BsPersonLinesFill, BsEye
} from 'react-icons/bs';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

export const MarketingDashboard: React.FC = () => {
  const [period, setPeriod] = useState<'30days' | '90days' | 'year'>('30days');
  
  // Mock data for zero-party data collection
  const zeroPartyData = [
    { name: 'Product Interests', count: 2450 },
    { name: 'Room Preferences', count: 2120 },
    { name: 'Feature Preferences', count: 1875 },
    { name: 'Pain Points', count: 1650 },
    { name: 'Purchase Timeline', count: 1250 },
    { name: 'Color/Finish', count: 980 },
  ];

  // Mock data for campaign performance
  const campaignData = [
    { name: 'Trash Can Email', clicks: 520, conversions: 68, ctr: 3.2, cvr: 13.1 },
    { name: 'Soap Dispenser Banner', clicks: 780, conversions: 95, ctr: 4.8, cvr: 12.2 },
    { name: 'Mirror Retargeting', clicks: 680, conversions: 102, ctr: 5.1, cvr: 15.0 },
    { name: 'Kitchen Bundle', clicks: 890, conversions: 145, ctr: 5.5, cvr: 16.3 },
    { name: 'Bathroom Essentials', clicks: 620, conversions: 87, ctr: 3.9, cvr: 14.0 },
  ];

  // Mock data for persona segmentation
  const personaData = [
    { name: 'Design Enthusiasts', value: 32, spend: 249, interests: ['kitchen', 'smart features'] },
    { name: 'Tech Early Adopters', value: 26, spend: 278, interests: ['voice control', 'alexa'] },
    { name: 'Premium Home Buyers', value: 22, spend: 315, interests: ['stainless steel', 'warranty'] },
    { name: 'Practical Shoppers', value: 20, spend: 175, interests: ['durability', 'price'] },
  ];

  // Mock data for feature interest timeline
  const featureTimelineData = [
    { month: 'Jan', 'Voice Control': 35, 'Motion Sensor': 45, 'Smart Features': 30 },
    { month: 'Feb', 'Voice Control': 38, 'Motion Sensor': 48, 'Smart Features': 31 },
    { month: 'Mar', 'Voice Control': 42, 'Motion Sensor': 47, 'Smart Features': 34 },
    { month: 'Apr', 'Voice Control': 45, 'Motion Sensor': 49, 'Smart Features': 38 },
    { month: 'May', 'Voice Control': 48, 'Motion Sensor': 52, 'Smart Features': 42 },
    { month: 'Jun', 'Voice Control': 52, 'Motion Sensor': 53, 'Smart Features': 45 }
  ];

  // Mock data for persona radar chart
  const personaRadarData = [
    { feature: 'Price Sensitivity', 'Design Enthusiasts': 30, 'Tech Early Adopters': 40, 'Premium Home Buyers': 20, 'Practical Shoppers': 85 },
    { feature: 'Design Focus', 'Design Enthusiasts': 90, 'Tech Early Adopters': 60, 'Premium Home Buyers': 75, 'Practical Shoppers': 30 },
    { feature: 'Tech Interest', 'Design Enthusiasts': 65, 'Tech Early Adopters': 95, 'Premium Home Buyers': 70, 'Practical Shoppers': 40 },
    { feature: 'Brand Loyalty', 'Design Enthusiasts': 70, 'Tech Early Adopters': 60, 'Premium Home Buyers': 85, 'Practical Shoppers': 45 },
    { feature: 'Durability', 'Design Enthusiasts': 60, 'Tech Early Adopters': 50, 'Premium Home Buyers': 80, 'Practical Shoppers': 90 },
    { feature: 'Eco-Friendly', 'Design Enthusiasts': 75, 'Tech Early Adopters': 70, 'Premium Home Buyers': 60, 'Practical Shoppers': 55 },
  ];

  // Mock data for conversion funnel influenced by chatbot
  const conversionFunnelData = [
    { stage: 'Site Visits', withChatbot: 1250, withoutChatbot: 1250 },
    { stage: 'Product Views', withChatbot: 950, withoutChatbot: 750 },
    { stage: 'Add to Cart', withChatbot: 425, withoutChatbot: 270 },
    { stage: 'Checkout Started', withChatbot: 280, withoutChatbot: 170 },
    { stage: 'Completed Purchase', withChatbot: 185, withoutChatbot: 105 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Marketing Intelligence Dashboard</h2>
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 text-sm rounded-md transition ${period === '30days' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setPeriod('30days')}
          >
            Last 30 Days
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-md transition ${period === '90days' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setPeriod('90days')}
          >
            Last 90 Days
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-md transition ${period === 'year' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setPeriod('year')}
          >
            Year to Date
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div 
          className="bg-white rounded-lg p-4 shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Zero-Party Data Points</p>
              <h3 className="text-2xl font-bold text-gray-800">10,325</h3>
            </div>
            <div className="bg-blue-100 p-2 rounded-lg">
              <BsCollection className="text-blue-600 text-xl" />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-2">↑ 24% from previous period</p>
        </motion.div>
        
        <motion.div 
          className="bg-white rounded-lg p-4 shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Conversion Rate</p>
              <h3 className="text-2xl font-bold text-gray-800">14.8%</h3>
            </div>
            <div className="bg-green-100 p-2 rounded-lg">
              <BsGraphUp className="text-green-600 text-xl" />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-2">↑ 3.2% from previous period</p>
        </motion.div>
        
        <motion.div 
          className="bg-white rounded-lg p-4 shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg. Cart Value</p>
              <h3 className="text-2xl font-bold text-gray-800">$172.50</h3>
            </div>
            <div className="bg-purple-100 p-2 rounded-lg">
              <BsTags className="text-purple-600 text-xl" />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-2">↑ 12.5% from previous period</p>
        </motion.div>
        
        <motion.div 
          className="bg-white rounded-lg p-4 shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Customer Profiles</p>
              <h3 className="text-2xl font-bold text-gray-800">5,842</h3>
            </div>
            <div className="bg-yellow-100 p-2 rounded-lg">
              <BsPersonLinesFill className="text-yellow-600 text-xl" />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-2">↑ 18.7% from previous period</p>
        </motion.div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Zero Party Data Collection */}
        <motion.div 
          className="bg-white rounded-lg p-4 shadow-sm"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-lg font-medium text-gray-800 mb-4">Zero-Party Data Collection</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={zeroPartyData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip formatter={(value) => [`${value.toLocaleString()} data points`, 'Collected']} />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
        
        {/* Audience Segmentation */}
        <motion.div 
          className="bg-white rounded-lg p-4 shadow-sm"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-lg font-medium text-gray-800 mb-4">Customer Persona Distribution</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={personaData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {personaData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name, props) => [`${value}%`, props.payload.name]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Campaign Performance */}
      <motion.div 
        className="bg-white rounded-lg p-4 shadow-sm"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-lg font-medium text-gray-800 mb-4">Campaign Performance</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clicks</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CTR</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CVR</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chatbot Influenced</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {campaignData.map((campaign, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{campaign.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{campaign.clicks}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{campaign.conversions}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{campaign.ctr}%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{campaign.cvr}%</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${index % 2 === 0 ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                      {index % 2 === 0 ? 'High Impact' : 'Medium Impact'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Feature Interest Trends */}
        <motion.div 
          className="bg-white rounded-lg p-4 shadow-sm"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-lg font-medium text-gray-800 mb-4">Feature Interest Trends</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={featureTimelineData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Voice Control" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="Motion Sensor" stroke="#82ca9d" />
                <Line type="monotone" dataKey="Smart Features" stroke="#ffc658" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
        
        {/* Persona Analysis */}
        <motion.div 
          className="bg-white rounded-lg p-4 shadow-sm"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
        >
          <h3 className="text-lg font-medium text-gray-800 mb-4">Persona Feature Preferences</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={personaRadarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="feature" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar name="Design Enthusiasts" dataKey="Design Enthusiasts" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Radar name="Tech Early Adopters" dataKey="Tech Early Adopters" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                <Radar name="Premium Home Buyers" dataKey="Premium Home Buyers" stroke="#ffc658" fill="#ffc658" fillOpacity={0.6} />
                <Radar name="Practical Shoppers" dataKey="Practical Shoppers" stroke="#ff8042" fill="#ff8042" fillOpacity={0.6} />
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Conversion Funnel Comparison */}
      <motion.div 
        className="bg-white rounded-lg p-4 shadow-sm"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-800">Conversion Funnel Comparison</h3>
          <div className="bg-blue-100 p-2 rounded-lg">
            <BsEye className="text-blue-600" />
          </div>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={conversionFunnelData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="stage" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="withChatbot" name="With Chatbot" fill="#8884d8" />
              <Bar dataKey="withoutChatbot" name="Without Chatbot" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-700 mb-2">Conversion Lift Analysis</h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-3 rounded-lg text-center">
              <div className="text-xs text-gray-500 mb-1">Site to Product</div>
              <div className="font-bold text-blue-600">+26.7%</div>
              <div className="text-xs text-gray-500 mt-1">Improvement</div>
            </div>
            <div className="bg-white p-3 rounded-lg text-center">
              <div className="text-xs text-gray-500 mb-1">Product to Cart</div>
              <div className="font-bold text-blue-600">+21.3%</div>
              <div className="text-xs text-gray-500 mt-1">Improvement</div>
            </div>
            <div className="bg-white p-3 rounded-lg text-center">
              <div className="text-xs text-gray-500 mb-1">Cart to Checkout</div>
              <div className="font-bold text-blue-600">+17.8%</div>
              <div className="text-xs text-gray-500 mt-1">Improvement</div>
            </div>
            <div className="bg-white p-3 rounded-lg text-center">
              <div className="text-xs text-gray-500 mb-1">Overall Conversion</div>
              <div className="font-bold text-blue-600">+76.2%</div>
              <div className="text-xs text-gray-500 mt-1">Improvement</div>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Marketing Recommendations */}
      <motion.div 
        className="bg-white rounded-lg p-4 shadow-sm"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <h3 className="text-lg font-medium text-gray-800 mb-4">AI-Generated Marketing Recommendations</h3>
        <div className="space-y-3">
          <div className="p-3 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-1">Audience Segmentation Opportunity</h4>
            <p className="text-sm text-blue-700">
              Create targeted email campaigns for "Design Enthusiasts" focusing on new finishes and premium design features.
              Chatbot data indicates this segment has 32% higher engagement with visual content.
            </p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <h4 className="font-medium text-green-800 mb-1">Product Feature Emphasis</h4>
            <p className="text-sm text-green-700">
              Increase emphasis on "Voice Control" features in kitchen products marketing. Interest has grown 48% in the last 60 days
              based on chatbot interactions, but only 22% of users are aware of this capability.
            </p>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg">
            <h4 className="font-medium text-purple-800 mb-1">Conversion Optimization</h4>
            <p className="text-sm text-purple-700">
              Add chatbot-powered product comparison to checkout process. A/B testing shows this can reduce cart abandonment
              by up to 24% for first-time buyers who are comparing product features.
            </p>
          </div>
          <div className="p-3 bg-yellow-50 rounded-lg">
            <h4 className="font-medium text-yellow-800 mb-1">Content Strategy</h4>
            <p className="text-sm text-yellow-700">
              Create video content addressing the top 3 troubleshooting issues identified in chatbot conversations:
              battery replacement, sensor calibration, and soap dispenser maintenance. These topics drive 41% of support queries.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};