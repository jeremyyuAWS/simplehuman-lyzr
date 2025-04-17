import React, { useState } from 'react';
import { useAnalyticsStore, mockTimelineData } from '../store/analyticsStore';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend 
} from 'recharts';
import { motion } from 'framer-motion';
import { 
  BsChatLeftTextFill, BsPeople, BsClock, BsQuestionCircle, 
  BsCalendar, BsArrowUp, BsArrowDown, BsFilter 
} from 'react-icons/bs';
import { BsCheckCircleFill } from './BsCheckCircleFill';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
const RADIAN = Math.PI / 180;

// Custom label for active users pie chart
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export const ChatbotAnalytics: React.FC = () => {
  const { analyticsData } = useAnalyticsStore();
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month'>('week');
  const [sessionType, setSessionType] = useState<'all' | 'first-time' | 'returning'>('all');

  // Mock data for user activity by hour
  const userActivityByHour = [
    { hour: '00:00', sessions: 5 },
    { hour: '01:00', sessions: 3 },
    { hour: '02:00', sessions: 2 },
    { hour: '03:00', sessions: 1 },
    { hour: '04:00', sessions: 1 },
    { hour: '05:00', sessions: 2 },
    { hour: '06:00', sessions: 4 },
    { hour: '07:00', sessions: 7 },
    { hour: '08:00', sessions: 12 },
    { hour: '09:00', sessions: 18 },
    { hour: '10:00', sessions: 22 },
    { hour: '11:00', sessions: 25 },
    { hour: '12:00', sessions: 24 },
    { hour: '13:00', sessions: 26 },
    { hour: '14:00', sessions: 28 },
    { hour: '15:00', sessions: 32 },
    { hour: '16:00', sessions: 30 },
    { hour: '17:00', sessions: 27 },
    { hour: '18:00', sessions: 23 },
    { hour: '19:00', sessions: 19 },
    { hour: '20:00', sessions: 15 },
    { hour: '21:00', sessions: 12 },
    { hour: '22:00', sessions: 9 },
    { hour: '23:00', sessions: 6 },
  ];

  // Mock data for completion rates
  const completionRatesData = [
    { name: 'Product Info', completed: 87, abandoned: 13 },
    { name: 'Troubleshooting', completed: 72, abandoned: 28 },
    { name: 'Order Query', completed: 92, abandoned: 8 },
    { name: 'Warranty', completed: 68, abandoned: 32 },
    { name: 'Return', completed: 77, abandoned: 23 },
  ];

  // Mock data for active vs. inactive users
  const userStatusData = [
    { name: 'Active', value: 72 },
    { name: 'Inactive', value: 28 },
  ];

  // Filter data based on selected time range
  const getFilteredTimelineData = () => {
    if (timeRange === 'day') return mockTimelineData.slice(-1);
    if (timeRange === 'week') return mockTimelineData.slice(-7);
    return mockTimelineData;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Chatbot Analytics</h2>
        <div className="flex space-x-4">
          <div className="flex items-center bg-white rounded-lg shadow-sm p-2">
            <BsCalendar className="text-gray-500 mr-2" />
            <select 
              className="bg-transparent border-none text-sm focus:outline-none"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as 'day' | 'week' | 'month')}
            >
              <option value="day">Today</option>
              <option value="week">Past Week</option>
              <option value="month">Past Month</option>
            </select>
          </div>
          <div className="flex items-center bg-white rounded-lg shadow-sm p-2">
            <BsFilter className="text-gray-500 mr-2" />
            <select 
              className="bg-transparent border-none text-sm focus:outline-none"
              value={sessionType}
              onChange={(e) => setSessionType(e.target.value as 'all' | 'first-time' | 'returning')}
            >
              <option value="all">All Sessions</option>
              <option value="first-time">First-Time Users</option>
              <option value="returning">Returning Users</option>
            </select>
          </div>
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
              <p className="text-sm text-gray-500">Total Sessions</p>
              <h3 className="text-2xl font-bold text-gray-800">{analyticsData.totalSessions}</h3>
            </div>
            <div className="bg-blue-100 p-2 rounded-lg">
              <BsChatLeftTextFill className="text-blue-600 text-xl" />
            </div>
          </div>
          <div className="flex items-center mt-2">
            <BsArrowUp className="text-green-600 text-xs" />
            <p className="text-xs text-green-600 ml-1">12% from last period</p>
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-white rounded-lg p-4 shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg. Conversation Length</p>
              <h3 className="text-2xl font-bold text-gray-800">6.2</h3>
            </div>
            <div className="bg-green-100 p-2 rounded-lg">
              <BsChatLeftTextFill className="text-green-600 text-xl" />
            </div>
          </div>
          <div className="flex items-center mt-2">
            <BsArrowUp className="text-green-600 text-xs" />
            <p className="text-xs text-green-600 ml-1">0.8 messages from last period</p>
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-white rounded-lg p-4 shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Completion Rate</p>
              <h3 className="text-2xl font-bold text-gray-800">78.5%</h3>
            </div>
            <div className="bg-purple-100 p-2 rounded-lg">
              <BsCheckCircleFill className="text-purple-600 text-xl" />
            </div>
          </div>
          <div className="flex items-center mt-2">
            <BsArrowUp className="text-green-600 text-xs" />
            <p className="text-xs text-green-600 ml-1">3.2% from last period</p>
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-white rounded-lg p-4 shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg. Response Time</p>
              <h3 className="text-2xl font-bold text-gray-800">1.2s</h3>
            </div>
            <div className="bg-yellow-100 p-2 rounded-lg">
              <BsClock className="text-yellow-600 text-xl" />
            </div>
          </div>
          <div className="flex items-center mt-2">
            <BsArrowDown className="text-green-600 text-xs" />
            <p className="text-xs text-green-600 ml-1">0.3s faster than last period</p>
          </div>
        </motion.div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sessions Over Time */}
        <motion.div 
          className="bg-white rounded-lg p-4 shadow-sm"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-lg font-medium text-gray-800 mb-4">Sessions Over Time</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={getFilteredTimelineData()}
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
        
        {/* User Activity by Hour of Day */}
        <motion.div 
          className="bg-white rounded-lg p-4 shadow-sm"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-lg font-medium text-gray-800 mb-4">User Activity by Hour</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={userActivityByHour}
                margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sessions" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Conversation Completion Rates by Topic */}
        <motion.div 
          className="bg-white rounded-lg p-4 shadow-sm"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-lg font-medium text-gray-800 mb-4">Completion Rates by Topic</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={completionRatesData}
                margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis type="category" dataKey="name" />
                <Tooltip formatter={(value) => [`${value}%`, 'Rate']} />
                <Legend />
                <Bar dataKey="completed" stackId="a" fill="#82ca9d" name="Completed" />
                <Bar dataKey="abandoned" stackId="a" fill="#ff8042" name="Abandoned" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
        
        {/* Active vs Inactive Users */}
        <motion.div 
          className="bg-white rounded-lg p-4 shadow-sm"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-lg font-medium text-gray-800 mb-4">Active vs. Inactive Users</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={userStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {userStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Users']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
      
      {/* User Satisfaction */}
      <motion.div 
        className="bg-white rounded-lg p-4 shadow-sm"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <h3 className="text-lg font-medium text-gray-800 mb-4">User Satisfaction</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            { score: 5, percent: 58, color: 'bg-green-500' },
            { score: 4, percent: 27, color: 'bg-green-300' },
            { score: 3, percent: 10, color: 'bg-yellow-400' },
            { score: 2, percent: 3, color: 'bg-orange-400' },
            { score: 1, percent: 2, color: 'bg-red-500' }
          ].map((item) => (
            <div key={item.score} className="bg-gray-50 p-3 rounded-lg text-center">
              <div className="text-lg font-bold text-gray-800">{item.score} ★</div>
              <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                <div 
                  className={`h-2 rounded-full ${item.color}`}
                  style={{ width: `${item.percent}%` }}
                ></div>
              </div>
              <div className="text-sm text-gray-500 mt-1">{item.percent}%</div>
            </div>
          ))}
        </div>
        <div className="mt-4 bg-gray-50 p-3 rounded-lg">
          <div className="flex justify-between items-center">
            <h4 className="font-medium text-gray-800">Average Satisfaction Score</h4>
            <div className="text-xl font-bold text-gray-800">4.36 / 5</div>
          </div>
          <div className="mt-2 flex items-center">
            <BsArrowUp className="text-green-600 text-xs" />
            <p className="text-xs text-green-600 ml-1">0.2 points from last period</p>
          </div>
        </div>
      </motion.div>
      
      {/* Top Questions and Bot Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        
        {/* Bot Performance */}
        <motion.div 
          className="bg-white p-4 rounded-lg shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <h3 className="text-lg font-medium text-gray-800 mb-4">Bot Performance</h3>
          <div className="space-y-3">
            {[
              { metric: 'Intent Recognition Rate', value: '94.2%', change: '+1.7%', isPositive: true },
              { metric: 'Fallback Rate', value: '5.8%', change: '-1.7%', isPositive: true },
              { metric: 'Handoff to Human Rate', value: '12.4%', change: '-2.3%', isPositive: true },
              { metric: 'Average Response Time', value: '1.2s', change: '-0.3s', isPositive: true },
              { metric: 'Message Exchange Rate', value: '4.7 msg/min', change: '+0.2', isPositive: true }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700">{item.metric}</p>
                <div className="flex items-center">
                  <span className="font-medium text-gray-900 mr-2">{item.value}</span>
                  <span className={`text-xs ${item.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {item.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};