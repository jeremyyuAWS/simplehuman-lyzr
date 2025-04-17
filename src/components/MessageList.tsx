import React from 'react';
import { Message } from '../types';
import { MessageBubble } from './MessageBubble';
import { BsRobot } from 'react-icons/bs';
import { motion } from 'framer-motion';

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
}

export const MessageList: React.FC<MessageListProps> = ({ messages, isTyping }) => {
  return (
    <div className="space-y-4 pb-2">
      {messages.map((message, index) => (
        <MessageBubble 
          key={index} 
          message={message} 
          isLatest={index === messages.length - 1}
        />
      ))}
      
      {isTyping && (
        <motion.div 
          className="flex items-start"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-2 flex-shrink-0">
            <BsRobot className="h-5 w-5 text-gray-600" />
          </div>
          <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};