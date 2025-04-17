import React from 'react';
import { motion } from 'framer-motion';
import { BsRobot, BsX, BsChatLeftText, BsArrowReturnLeft, BsShieldCheck, BsRecycle, BsTools, BsQuestionCircle } from 'react-icons/bs';
import { conversationStarters, conversationScenarios } from '../data/mockProducts';
import { useConversationStore } from '../store/conversationStore';

interface DemoControllerProps {
  onClose: () => void;
}

export const DemoController: React.FC<DemoControllerProps> = ({ onClose }) => {
  const { resetConversation, sendMessage } = useConversationStore();

  // Function to start a demo with a predefined conversation starter
  const startDemo = (starterIndex: number) => {
    const starter = conversationStarters[starterIndex];
    
    // Reset conversation first
    resetConversation();
    
    // Send the initial message after a brief delay
    setTimeout(() => {
      sendMessage(starter.initialMessage);
    }, 500);
    
    onClose();
  };

  // Group conversation starters by category
  const categorizedStarters = [
    {
      category: 'Product Discovery',
      starters: [conversationStarters[0], conversationStarters[4]]
    },
    {
      category: 'Support & Troubleshooting',
      starters: [conversationStarters[1], conversationStarters[5]]
    },
    {
      category: 'Order Management',
      starters: [conversationStarters[2], conversationStarters[6]]
    },
    {
      category: 'Warranty & Registration',
      starters: [conversationStarters[3]]
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-700">Demo Conversation Starters</h3>
        <motion.button 
          onClick={onClose}
          className="text-gray-500"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <BsX className="h-4 w-4" />
        </motion.button>
      </div>
      
      <div className="space-y-4">
        {categorizedStarters.map((category, idx) => (
          <div key={idx} className="space-y-2">
            <h4 className="text-xs font-medium uppercase text-gray-500">{category.category}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {category.starters.map((starter, index) => (
                <motion.button
                  key={starter.id}
                  className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 p-2 rounded text-left text-sm"
                  onClick={() => startDemo(conversationStarters.findIndex(s => s.id === starter.id))}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div>
                    <div className="font-medium text-gray-800">{starter.name}</div>
                    <div className="text-xs text-gray-500 truncate max-w-xs">{starter.initialMessage}</div>
                  </div>
                  <BsChatLeftText className="text-gray-400 flex-shrink-0" />
                </motion.button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-4 mt-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Scenario Simulations</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {Object.entries(conversationScenarios).map(([id, scenario]) => {
            let icon;
            switch(id) {
              case 'product-return':
                icon = <BsArrowReturnLeft className="text-red-500" />;
                break;
              case 'warranty-registration':
                icon = <BsShieldCheck className="text-green-500" />;
                break;
              case 'refurbished-offer':
                icon = <BsRecycle className="text-blue-500" />;
                break;
              case 'troubleshooting':
                icon = <BsTools className="text-purple-500" />;
                break;
              default:
                icon = <BsQuestionCircle className="text-yellow-500" />;
            }
            
            return (
              <motion.div
                key={id}
                className="bg-gray-50 hover:bg-gray-100 p-2 rounded cursor-pointer"
                onClick={() => {
                  // Navigate to deflection metrics tab and show this scenario
                  // You could dispatch an event or use a context to communicate this
                  alert(`To view the full "${scenario.title}" scenario, please go to the Deflection Metrics tab and select it from the examples.`);
                  onClose();
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 bg-white rounded-full">
                    {icon}
                  </div>
                  <div>
                    <div className="font-medium text-gray-800 text-sm">{scenario.title}</div>
                    <div className="text-xs text-gray-500 truncate max-w-xs">{scenario.description}</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="border-t pt-4 mt-4">
        <button
          className="bg-gray-900 text-white py-2 px-4 rounded-md w-full hover:bg-gray-800 transition"
          onClick={() => {
            resetConversation();
            onClose();
          }}
        >
          Reset Conversation
        </button>
      </div>
    </div>
  );
};