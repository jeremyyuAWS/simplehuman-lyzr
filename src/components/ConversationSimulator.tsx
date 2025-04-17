import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BsRobot, BsPerson, BsPlayFill, BsFillPauseFill, BsArrowCounterclockwise, BsInfoCircle, BsX } from 'react-icons/bs';
import { conversationScenarios } from '../data/mockProducts';

interface ConversationSimulatorProps {
  scenarioId: string;
  onClose?: () => void;
  showHeader?: boolean;
}

export const ConversationSimulator: React.FC<ConversationSimulatorProps> = ({ scenarioId, onClose, showHeader = true }) => {
  const [activeMessages, setActiveMessages] = useState<Array<{ sender: string; message: string; image?: string }>>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showOutcomes, setShowOutcomes] = useState(false);

  // Get selected scenario
  const scenario = conversationScenarios[scenarioId as keyof typeof conversationScenarios];

  useEffect(() => {
    if (!scenario) return;
    
    if (isPlaying && currentStep < scenario.conversations.length) {
      const timer = setTimeout(() => {
        setActiveMessages(prev => [
          ...prev,
          scenario.conversations[currentStep]
        ]);
        setCurrentStep(currentStep + 1);
      }, currentStep === 0 ? 1000 : 2000);
      
      return () => clearTimeout(timer);
    } else if (currentStep >= scenario.conversations.length) {
      setIsPlaying(false);
      setShowOutcomes(true);
    }
  }, [currentStep, isPlaying, scenario]);
  
  const resetSimulation = () => {
    setActiveMessages([]);
    setCurrentStep(0);
    setIsPlaying(false);
    setShowOutcomes(false);
  };
  
  if (!scenario) return <div>Scenario not found</div>;

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden h-full flex flex-col">
      {showHeader && (
        <div className="bg-gray-800 text-white p-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BsRobot className="text-gray-300" />
            <h3 className="font-medium">{scenario.title}</h3>
          </div>
          <div className="flex space-x-2">
            <motion.button
              onClick={resetSimulation}
              className="text-gray-300 hover:text-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <BsArrowCounterclockwise />
            </motion.button>
            {onClose && (
              <motion.button
                onClick={onClose}
                className="text-gray-300 hover:text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <BsX />
              </motion.button>
            )}
          </div>
        </div>
      )}
      
      <div className="p-3 bg-gray-50 border-b">
        <p className="text-sm text-gray-600">{scenario.description}</p>
      </div>
      
      <div className="flex-grow overflow-auto p-4 bg-gray-100">
        <div className="space-y-4">
          {activeMessages.map((msg, index) => (
            <motion.div
              key={index}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              initial={{ opacity: 0, y: 10, x: msg.sender === 'user' ? 10 : -10 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {msg.sender === 'bot' && (
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-2 flex-shrink-0">
                  <BsRobot className="h-5 w-5 text-gray-700" />
                </div>
              )}
              
              <div className={`rounded-lg p-3 max-w-[80%] ${msg.sender === 'user' ? 'bg-gray-800 text-white' : 'bg-white'}`}>
                <p className="whitespace-pre-wrap">{msg.message}</p>
                {msg.image && (
                  <motion.div
                    className="mt-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <img 
                      src={msg.image} 
                      alt="Product" 
                      className="max-h-40 rounded-md object-cover"
                    />
                  </motion.div>
                )}
              </div>
              
              {msg.sender === 'user' && (
                <div className="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center ml-2 flex-shrink-0">
                  <BsPerson className="h-5 w-5 text-white" />
                </div>
              )}
            </motion.div>
          ))}
          
          {activeMessages.length === 0 && (
            <div className="flex justify-center items-center h-40">
              <p className="text-gray-500">Press play to start the conversation</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Playback controls */}
      <div className="p-3 bg-white border-t flex justify-between items-center">
        <div className="flex space-x-3">
          <motion.button
            onClick={() => setIsPlaying(!isPlaying)}
            disabled={currentStep >= scenario.conversations.length}
            className="p-2 rounded-full bg-gray-800 text-white disabled:opacity-50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isPlaying ? <BsFillPauseFill /> : <BsPlayFill className="ml-0.5" />}
          </motion.button>
          <motion.button
            onClick={resetSimulation}
            className="p-2 rounded-full bg-gray-200 text-gray-700"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <BsArrowCounterclockwise />
          </motion.button>
        </div>
        
        <div className="text-sm text-gray-500">
          {currentStep}/{scenario.conversations.length} messages
        </div>
      </div>
      
      {/* Outcomes panel */}
      {showOutcomes && (
        <motion.div
          className="p-4 bg-green-50 border-t"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center mb-3">
            <BsInfoCircle className="text-green-600 mr-2" />
            <h4 className="font-medium text-green-800">Conversation Outcomes</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="text-sm font-medium text-gray-700 mb-2">Results</h5>
              <ul className="space-y-1.5">
                {scenario.outcomes.map((outcome, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center text-sm text-gray-600"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                    {outcome}
                  </motion.li>
                ))}
              </ul>
            </div>
            
            {scenario.metrics && (
              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-2">Metrics</h5>
                <div className="space-y-2">
                  {scenario.metrics.satisfactionScore && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Customer Satisfaction:</span>
                      <span className="font-medium text-gray-800">{scenario.metrics.satisfactionScore}/5</span>
                    </div>
                  )}
                  {scenario.metrics.timeToResolution && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Time to Resolution:</span>
                      <span className="font-medium text-gray-800">{scenario.metrics.timeToResolution}</span>
                    </div>
                  )}
                  {scenario.metrics.sentimentShift && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Sentiment Shift:</span>
                      <span className="font-medium text-gray-800">{scenario.metrics.sentimentShift}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};