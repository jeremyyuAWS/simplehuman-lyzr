import React from 'react';
import { BsX, BsRobot, BsSearch, BsLightningCharge, BsClock, BsVolumeUp, BsBarChartFill } from 'react-icons/bs';
import { motion } from 'framer-motion';

interface WelcomeModalProps {
  onClose: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ onClose }) => {
  return (
    <motion.div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-auto"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-xl font-medium text-gray-900">Welcome to Simplehuman Analytics Platform</h2>
          <motion.button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <BsX className="h-5 w-5" />
          </motion.button>
        </div>
        
        <div className="p-5 space-y-4">
          <motion.div 
            className="flex items-center justify-center mb-6"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-blue-100 p-3 rounded-full">
              <BsBarChartFill className="h-10 w-10 text-blue-700" />
            </div>
          </motion.div>
          
          <p className="text-gray-600">
            Welcome to our AI-driven marketing analytics platform. This dashboard provides real-time insights from customer interactions with our intelligent chatbot assistant.
          </p>
          
          <div className="space-y-4 mt-6">
            <motion.div 
              className="flex items-start"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex-shrink-0 mr-3">
                <BsBarChartFill className="h-5 w-5 text-blue-700" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Chatbot Analytics</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Track conversation metrics, user engagement, and zero-party data collection in real-time.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-start"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex-shrink-0 mr-3">
                <BsLightningCharge className="h-5 w-5 text-blue-700" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">A/B Testing</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Compare chatbot conversation flows, messages, and features to optimize customer experience.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-start"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex-shrink-0 mr-3">
                <BsClock className="h-5 w-5 text-blue-700" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Deflection Metrics</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Measure support ticket deflection and cost savings from automated customer service.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-start"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex-shrink-0 mr-3">
                <BsRobot className="h-5 w-5 text-blue-700" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Interactive Demo</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Try the chatbot yourself by clicking the icon in the bottom right corner. All interactions will be tracked in the analytics dashboard.
                </p>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            className="bg-gray-50 p-4 rounded-md mt-4"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-sm text-gray-600">
              <strong>Key Benefits:</strong>
            </p>
            <ul className="text-sm text-gray-600 mt-1 list-disc list-inside space-y-1">
              <li>Reduce customer service costs through automated support</li>
              <li>Collect valuable zero-party data for marketing personalization</li>
              <li>Optimize product marketing based on real customer interests</li>
              <li>Identify pain points and improve customer satisfaction</li>
            </ul>
          </motion.div>
        </div>
        
        <div className="bg-gray-50 px-5 py-4 flex justify-end rounded-b-lg">
          <motion.button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Dashboard
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};