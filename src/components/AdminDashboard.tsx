import React, { useState } from 'react';
import { useAnalyticsStore, mockTimelineData, mockProductByRoomData, mockUserJourneyData, mockFeatureByProductData } from '../store/analyticsStore';
import { useConversationStore } from '../store/conversationStore';
import { 
  BsBarChartFill, BsPieChartFill, BsGraphUp, BsPeople, BsLightbulbFill, 
  BsChatLeftTextFill, BsQuestionCircle, BsFilterCircle, BsBoxArrowUpRight
} from 'react-icons/bs';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, FunnelChart, Funnel, LabelList,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

export const AdminDashboard: React.FC = () => {
  const { analyticsData, currentInsights } = useAnalyticsStore();
  const { sessions } = useConversationStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'insights' | 'segments' | 'journey'>('overview');

  return (
    <div className="bg-gray-100 rounded-lg p-4 h-full overflow-auto">
      <header className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Marketing Analytics Dashboard</h2>
        <p className="text-gray-600">Real-time customer insights from chatbot interactions</p>
      </header>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-6">
        <button 
          className={`px-4 py-2 font-medium text-sm rounded-t-lg ${activeTab === 'overview' ? 'bg-white border-b-2 border-gray-800 text-gray-800' : 'text-gray-600'}`}
          onClick={() => setActiveTab('overview')}
        >
          <div className="flex items-center space-x-2">
            <BsBarChartFill />
            <span>Overview</span>
          </div>
        </button>
        <button 
          className={`px-4 py-2 font-medium text-sm rounded-t-lg ${activeTab === 'insights' ? 'bg-white border-b-2 border-gray-800 text-gray-800' : 'text-gray-600'}`}
          onClick={() => setActiveTab('insights')}
        >
          <div className="flex items-center space-x-2">
            <BsLightbulbFill />
            <span>Insights</span>
          </div>
        </button>
        <button 
          className={`px-4 py-2 font-medium text-sm rounded-t-lg ${activeTab === 'segments' ? 'bg-white border-b-2 border-gray-800 text-gray-800' : 'text-gray-600'}`}
          onClick={() => setActiveTab('segments')}
        >
          <div className="flex items-center space-x-2">
            <BsPeople />
            <span>Segments</span>
          </div>
        </button>
        <button 
          className={`px-4 py-2 font-medium text-sm rounded-t-lg ${activeTab === 'journey' ? 'bg-white border-b-2 border-gray-800 text-gray-800' : 'text-gray-600'}`}
          onClick={() => setActiveTab('journey')}
        >
          <div className="flex items-center space-x-2">
            <BsGraphUp />
            <span>User Journey</span>
          </div>
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div>
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <motion.div 
              className="bg-white rounded-lg p-4 shadow-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Sessions</p>
                  <h3 className="text-2xl font-bold text-gray-800">{analyticsData.totalSessions}</h3>
                </div>
                <div className="bg-blue-100 p-2 rounded-lg">
                  <BsChatLeftTextFill className="text-blue-600 text-xl" />
                </div>
              </div>
              <p className="text-xs text-green-600 mt-2">↑ 12% from last month</p>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-lg p-4 shadow-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Unique Users</p>
                  <h3 className="text-2xl font-bold text-gray-800">{analyticsData.uniqueUsers}</h3>
                </div>
                <div className="bg-green-100 p-2 rounded-lg">
                  <BsPeople className="text-green-600 text-xl" />
                </div>
              </div>
              <p className="text-xs text-green-600 mt-2">↑ 8% from last month</p>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-lg p-4 shadow-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Avg. Session Duration</p>
                  <h3 className="text-2xl font-bold text-gray-800">{analyticsData.averageSessionDuration}s</h3>
                </div>
                <div className="bg-purple-100 p-2 rounded-lg">
                  <BsGraphUp className="text-purple-600 text-xl" />
                </div>
              </div>
              <p className="text-xs text-green-600 mt-2">↑ 15% from last month</p>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-lg p-4 shadow-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Conversion Rate</p>
                  <h3 className="text-2xl font-bold text-gray-800">{analyticsData.conversionRate}%</h3>
                </div>
                <div className="bg-yellow-100 p-2 rounded-lg">
                  <BsBoxArrowUpRight className="text-yellow-600 text-xl" />
                </div>
              </div>
              <p className="text-xs text-green-600 mt-2">↑ 5% from last month</p>
            </motion.div>
          </div>
          
          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* User Sessions Chart */}
            <motion.div 
              className="bg-white p-4 rounded-lg shadow-sm"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-lg font-medium text-gray-800 mb-4">Session Trends</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={mockTimelineData}
                    margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="sessions" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="users" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
            
            {/* Intent Distribution */}
            <motion.div 
              className="bg-white p-4 rounded-lg shadow-sm"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-lg font-medium text-gray-800 mb-4">User Intents</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={Object.entries(analyticsData.intentDistribution).map(([name, value]) => ({ name, value }))}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {Object.entries(analyticsData.intentDistribution).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>
          
          {/* Charts Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Product Interest Distribution */}
            <motion.div 
              className="bg-white p-4 rounded-lg shadow-sm"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="text-lg font-medium text-gray-800 mb-4">Product Interest Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={Object.entries(analyticsData.productInterestDistribution).map(([name, value]) => ({ 
                      name: name.replace('_', ' '),
                      value 
                    }))}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
            
            {/* Room Type Distribution */}
            <motion.div 
              className="bg-white p-4 rounded-lg shadow-sm"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              <h3 className="text-lg font-medium text-gray-800 mb-4">Room Type Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={Object.entries(analyticsData.roomTypeDistribution).map(([name, value]) => ({ name, value }))}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>
          
          {/* Common Issues */}
          <motion.div 
            className="bg-white p-4 rounded-lg shadow-sm mb-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
          >
            <h3 className="text-lg font-medium text-gray-800 mb-4">Common Issues</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={Object.entries(analyticsData.commonIssues).map(([name, value]) => ({ 
                    name: name.replace('_', ' '),
                    value 
                  }))}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#FF8042" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
          
          {/* Top Questions */}
          <motion.div 
            className="bg-white p-4 rounded-lg shadow-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-800">Top Questions</h3>
              <div className="bg-blue-100 p-2 rounded-lg">
                <BsQuestionCircle className="text-blue-600" />
              </div>
            </div>
            <div className="space-y-3">
              {analyticsData.topQuestions.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">{item.question}</p>
                  <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">{item.count}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* Insights Tab */}
      {activeTab === 'insights' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentInsights.map((insight, index) => (
              <motion.div 
                key={insight.id} 
                className="bg-white p-4 rounded-lg shadow-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`rounded-full p-2 
                    ${insight.type === 'product' ? 'bg-blue-100' : 
                      insight.type === 'segment' ? 'bg-green-100' : 
                      insight.type === 'feature' ? 'bg-purple-100' : 'bg-yellow-100'}`}
                  >
                    <BsLightbulbFill className={`
                      ${insight.type === 'product' ? 'text-blue-600' : 
                        insight.type === 'segment' ? 'text-green-600' : 
                        insight.type === 'feature' ? 'text-purple-600' : 'text-yellow-600'}`} 
                    />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800">{insight.title}</h3>
                  <span className={`ml-auto text-xs px-2 py-1 rounded-full 
                    ${insight.impact === 'high' ? 'bg-red-100 text-red-800' : 
                      insight.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-blue-100 text-blue-800'}`}
                  >
                    {insight.impact} impact
                  </span>
                </div>
                <p className="text-gray-600 mb-3">{insight.description}</p>
                {insight.recommendedAction && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-gray-700">Recommended Action:</p>
                    <p className="text-sm text-gray-600">{insight.recommendedAction}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Segments Tab */}
      {activeTab === 'segments' && (
        <div className="space-y-6">
          {/* Product interest by room type */}
          <motion.div 
            className="bg-white p-4 rounded-lg shadow-sm"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-lg font-medium text-gray-800 mb-4">Product Interest by Room Type</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={mockProductByRoomData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Trash Can" stackId="a" fill="#8884d8" />
                  <Bar dataKey="Soap Dispenser" stackId="a" fill="#82ca9d" />
                  <Bar dataKey="Mirror" stackId="a" fill="#ffc658" />
                  <Bar dataKey="Paper Towel" stackId="a" fill="#ff8042" />
                  <Bar dataKey="Dish Rack" stackId="a" fill="#0088fe" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
          
          {/* Feature Interest by Product Type */}
          <motion.div 
            className="bg-white p-4 rounded-lg shadow-sm"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-lg font-medium text-gray-800 mb-4">Feature Interest by Product Type</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={mockFeatureByProductData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="feature" type="category" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Trash Can" stackId="a" fill="#8884d8" />
                  <Bar dataKey="Soap Dispenser" stackId="a" fill="#82ca9d" />
                  <Bar dataKey="Mirror" stackId="a" fill="#ffc658" />
                  <Bar dataKey="Paper Towel" stackId="a" fill="#ff8042" />
                  <Bar dataKey="Dish Rack" stackId="a" fill="#0088fe" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
          
          {/* Radar Chart for Feature Importance */}
          <motion.div 
            className="bg-white p-4 rounded-lg shadow-sm"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-lg font-medium text-gray-800 mb-4">Feature Importance by Segment</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[
                  { feature: 'Price', highValue: 90, midValue: 70, lowValue: 50 },
                  { feature: 'Design', highValue: 85, midValue: 65, lowValue: 45 },
                  { feature: 'Durability', highValue: 95, midValue: 75, lowValue: 60 },
                  { feature: 'Smart Features', highValue: 80, midValue: 60, lowValue: 30 },
                  { feature: 'Eco-Friendly', highValue: 75, midValue: 80, lowValue: 40 },
                  { feature: 'Warranty', highValue: 88, midValue: 72, lowValue: 55 },
                ]}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="feature" />
                  <PolarRadiusAxis />
                  <Tooltip />
                  <Radar name="High Value" dataKey="highValue" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  <Radar name="Mid Value" dataKey="midValue" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                  <Radar name="Low Value" dataKey="lowValue" stroke="#ffc658" fill="#ffc658" fillOpacity={0.6} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      )}

      {/* User Journey Tab */}
      {activeTab === 'journey' && (
        <div className="space-y-6">
          {/* User Journey Funnel */}
          <motion.div 
            className="bg-white p-4 rounded-lg shadow-sm"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-lg font-medium text-gray-800 mb-4">Customer Journey Funnel</h3>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <FunnelChart>
                  <Tooltip formatter={(value, name, props) => [`${value} users (${props.payload.percent}%)`, name]} />
                  <Funnel
                    dataKey="count"
                    data={mockUserJourneyData}
                    isAnimationActive
                  >
                    <LabelList position="right" dataKey="name" fill="#000" stroke="none" />
                    {mockUserJourneyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Funnel>
                </FunnelChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
          
          {/* Zero Party Data Collection */}
          <motion.div 
            className="bg-white p-4 rounded-lg shadow-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-800">Zero-Party Data Collection</h3>
              <div className="bg-purple-100 p-2 rounded-lg">
                <BsFilterCircle className="text-purple-600" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 p-3 rounded-lg">
                <h4 className="font-medium text-gray-700 mb-2">Room Preferences</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Kitchen</span>
                    <div className="w-24 bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                    <span className="text-xs text-gray-500">70%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Bathroom</span>
                    <div className="w-24 bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                    <span className="text-xs text-gray-500">60%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Office</span>
                    <div className="w-24 bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '35%' }}></div>
                    </div>
                    <span className="text-xs text-gray-500">35%</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <h4 className="font-medium text-gray-700 mb-2">Feature Interests</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Motion Sensor</span>
                    <div className="w-24 bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    <span className="text-xs text-gray-500">85%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Voice Control</span>
                    <div className="w-24 bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                    <span className="text-xs text-gray-500">65%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Rechargeable</span>
                    <div className="w-24 bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '55%' }}></div>
                    </div>
                    <span className="text-xs text-gray-500">55%</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <h4 className="font-medium text-gray-700 mb-2">Pain Points</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Battery Life</span>
                    <div className="w-24 bg-gray-200 rounded-full h-2.5">
                      <div className="bg-red-600 h-2.5 rounded-full" style={{ width: '72%' }}></div>
                    </div>
                    <span className="text-xs text-gray-500">72%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Sensor Issues</span>
                    <div className="w-24 bg-gray-200 rounded-full h-2.5">
                      <div className="bg-red-600 h-2.5 rounded-full" style={{ width: '58%' }}></div>
                    </div>
                    <span className="text-xs text-gray-500">58%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Durability</span>
                    <div className="w-24 bg-gray-200 rounded-full h-2.5">
                      <div className="bg-red-600 h-2.5 rounded-full" style={{ width: '34%' }}></div>
                    </div>
                    <span className="text-xs text-gray-500">34%</span>
                  </div>
                </div>
              </div>
            </div>
            
            <h4 className="font-medium text-gray-700 mb-3">Recent Survey Responses</h4>
            <div className="space-y-3">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex justify-between">
                  <p className="text-sm text-gray-600">Which feature is most important to you?</p>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">Motion sensing</span>
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex justify-between">
                  <p className="text-sm text-gray-600">Where will you use this product?</p>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">Kitchen</span>
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex justify-between">
                  <p className="text-sm text-gray-600">Most important factor in your decision?</p>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">Durability</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};