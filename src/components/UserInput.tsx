import React, { useState, useRef, useEffect } from 'react';
import { BsSend, BsMic, BsMicMute, BsStop } from 'react-icons/bs';
import { motion } from 'framer-motion';

interface UserInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export const UserInput: React.FC<UserInputProps> = ({ onSendMessage, disabled = false }) => {
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  // Check if speech recognition is supported
  useEffect(() => {
    const isSpeechRecognitionSupported = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
    setSpeechSupported(isSpeechRecognitionSupported);
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSendMessage(input);
      setInput('');
      // Reset textarea height
      if (inputRef.current) {
        inputRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    // Auto resize the textarea
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  };

  // Mock implementation of speech recognition
  const toggleListening = () => {
    if (!speechSupported) return;
    
    if (!isListening) {
      setIsListening(true);
      // In a real implementation, we would use the Web Speech API
      // This is just a simulation
      setTimeout(() => {
        setInput(prevInput => prevInput + (prevInput ? ' ' : '') + "Can you help me find a trash can for my kitchen?");
        setIsListening(false);
      }, 3000);
    } else {
      setIsListening(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-end">
      <textarea
        ref={inputRef}
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        placeholder="Type your message..."
        disabled={disabled || isListening}
        className="flex-grow min-h-[40px] max-h-[120px] resize-none border border-gray-300 rounded-l-md p-2 focus:outline-none focus:ring-1 focus:ring-gray-400 disabled:opacity-50"
        rows={1}
      />
      
      {/* Voice input button */}
      {speechSupported && (
        <motion.button
          type="button"
          disabled={disabled}
          onClick={toggleListening}
          className={`bg-gray-100 text-gray-700 p-2 h-[40px] ${isListening ? 'voice-input-button active' : 'voice-input-button'}`}
          whileTap={{ scale: 0.9 }}
        >
          {isListening ? <BsStop className="h-5 w-5" /> : <BsMic className="h-5 w-5" />}
        </motion.button>
      )}
      
      <motion.button
        type="submit"
        disabled={!input.trim() || disabled}
        className="bg-gray-900 text-white p-2 rounded-r-md h-[40px] disabled:opacity-50 disabled:cursor-not-allowed"
        whileHover={!(!input.trim() || disabled) ? { scale: 1.05 } : {}}
        whileTap={!(!input.trim() || disabled) ? { scale: 0.95 } : {}}
      >
        <BsSend className="h-5 w-5" />
      </motion.button>
    </form>
  );
};