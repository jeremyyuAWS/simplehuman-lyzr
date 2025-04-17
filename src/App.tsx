import React, { useState, useEffect, useRef } from 'react';
import { ChatBot } from './components/ChatBot';
import { WelcomeModal } from './components/WelcomeModal';
import { useAuthStore } from './store/authStore';
import { AdminDashboard } from './components/AdminDashboard';
import { ChatbotAnalytics } from './components/ChatbotAnalytics';
import { ABTestingDashboard } from './components/ABTestingDashboard';
import { MarketingDashboard } from './components/MarketingDashboard';
import { DeflectionMetrics } from './components/DeflectionMetrics';
import { BsRobot, BsX, BsChevronUp, BsChevronDown, BsSpeedometer, BsBarChartFill, BsGraphUp, BsArrowLeftRight, BsLightbulb, BsArrowsFullscreen, BsArrowClockwise } from 'react-icons/bs';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocalStorage } from 'react-use';
import { DemoController } from './components/DemoController';
import { useConversationStore } from './store/conversationStore';
import { EdgeFunctionTester } from './components/EdgeFunctionTester';

function App() {
  const [showChatbot, setShowChatbot] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [chatMinimized, setChatMinimized] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showDemoController, setShowDemoController] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'chatbot-analytics' | 'ab-testing' | 'marketing' | 'deflection' | 'edge-test'>('dashboard');
  const { isAuthenticated, user } = useAuthStore();
  const { resetConversation } = useConversationStore();
  const chatRef = useRef<HTMLDivElement>(null);
  const [chatPosition, setChatPosition] = useLocalStorage<{right: number, bottom: number}>('chatPosition', {right: 4, bottom: 4});
  const [chatSize, setChatSize] = useLocalStorage<{width: number, height: number}>('chatSize', {width: 400, height: 500});
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const dragStart = useRef<{x: number, y: number} | null>(null);
  const resizeStart = useRef<{width: number, height: number, x: number, y: number} | null>(null);

  useEffect(() => {
    // Set title
    document.title = "Simplehuman Marketing Analytics";
    
    // Check if first visit
    const hasVisited = localStorage.getItem('simplehumanAssistantVisited');
    if (hasVisited) {
      setShowModal(false);
    }
  }, []);

  const closeModal = () => {
    setShowModal(false);
    localStorage.setItem('simplehumanAssistantVisited', 'true');
  };

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
    setChatMinimized(false);
  };

  const toggleMinimize = () => {
    setChatMinimized(!chatMinimized);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleResetAssistant = () => {
    resetConversation();
  };

  const toggleDemoController = () => {
    setShowDemoController(!showDemoController);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (chatRef.current) {
      setIsDragging(true);
      dragStart.current = { 
        x: e.clientX, 
        y: e.clientY 
      };
    }
    e.preventDefault();
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    if (chatRef.current) {
      setIsResizing(true);
      resizeStart.current = { 
        width: chatRef.current.offsetWidth,
        height: chatRef.current.offsetHeight,
        x: e.clientX,
        y: e.clientY
      };
    }
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && dragStart.current && chatPosition) {
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      
      const newRight = Math.max(0, chatPosition.right - dx);
      const newBottom = Math.max(0, chatPosition.bottom - dy);
      
      setChatPosition({
        right: newRight,
        bottom: newBottom
      });
      
      dragStart.current = { x: e.clientX, y: e.clientY };
    }
    
    if (isResizing && resizeStart.current) {
      const dx = e.clientX - resizeStart.current.x;
      const dy = e.clientY - resizeStart.current.y;
      
      const newWidth = Math.max(300, resizeStart.current.width + dx);
      const newHeight = Math.max(400, resizeStart.current.height - dy);
      
      setChatSize({
        width: newWidth,
        height: newHeight
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  useEffect(() => {
    if (isDragging || isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing]);

  // Render the active tab component
  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'chatbot-analytics':
        return <ChatbotAnalytics />;
      case 'ab-testing':
        return <ABTestingDashboard />;
      case 'marketing':
        return <MarketingDashboard />;
      case 'deflection':
        return <DeflectionMetrics />;
      case 'edge-test':
        return <EdgeFunctionTester />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BsRobot className="h-7 w-7 text-gray-700" />
            <h1 className="text-xl font-light tracking-tight text-gray-900">simplehuman</h1>
            <span className="ml-3 bg-blue-500 text-white text-xs font-medium px-2.5 py-0.5 rounded">Analytics Platform</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a 
              href="#" 
              className={`text-sm font-medium ${activeTab === 'dashboard' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
              onClick={() => setActiveTab('dashboard')}
            >
              Dashboard
            </a>
            <a 
              href="#" 
              className={`text-sm font-medium ${activeTab === 'chatbot-analytics' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
              onClick={() => setActiveTab('chatbot-analytics')}
            >
              Chatbot Analytics
            </a>
            <a 
              href="#" 
              className={`text-sm font-medium ${activeTab === 'ab-testing' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
              onClick={() => setActiveTab('ab-testing')}
            >
              A/B Testing
            </a>
            <a 
              href="#" 
              className={`text-sm font-medium ${activeTab === 'deflection' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
              onClick={() => setActiveTab('deflection')}
            >
              Deflection Metrics
            </a>
            <a 
              href="#" 
              className={`text-sm font-medium ${activeTab === 'edge-test' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
              onClick={() => setActiveTab('edge-test')}
            >
              Edge Test
            </a>
            {isAuthenticated ? (
              <span className="text-sm font-medium text-gray-900">Hello, {user?.name}</span>
            ) : (
              <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-800">Sign In</a>
            )}
          </nav>
        </div>
      </header>

      {/* Main Content - Dashboard */}
      <main className="flex-grow container mx-auto px-4 py-8">
        {renderActiveTab()}
      </main>

      {/* Chatbot */}
      <AnimatePresence>
        {showChatbot && (
          <motion.div 
            ref={chatRef}
            className={`chat-window fixed z-50 ${chatMinimized ? '' : ''} ${isFullscreen ? 'expanded' : ''}`}
            style={{
              width: chatMinimized ? '300px' : (isFullscreen ? '100%' : chatSize.width),
              height: chatMinimized ? 'auto' : (isFullscreen ? '100%' : chatSize.height),
              right: isFullscreen ? '0' : `${chatPosition?.right}px`,
              bottom: isFullscreen ? '0' : `${chatPosition?.bottom}px`,
              borderRadius: isFullscreen ? '0' : undefined
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header bar - draggable */}
            <div 
              className="bg-gray-900 px-4 py-2 flex justify-between items-center cursor-move rounded-t-lg"
              onMouseDown={isFullscreen ? undefined : handleMouseDown}
            >
              <div className="flex items-center space-x-2 text-white">
                <BsRobot className="h-4 w-4" />
                <span className="text-sm font-medium">Simplehuman Assistant</span>
              </div>
              <div className="flex items-center space-x-2">
                <motion.button 
                  onClick={handleResetAssistant}
                  className="text-gray-300 hover:text-white"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Reset conversation"
                >
                  <BsArrowClockwise className="h-4 w-4" />
                </motion.button>
                
                <motion.button 
                  onClick={toggleDemoController}
                  className="text-gray-300 hover:text-white"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Demo scenarios"
                >
                  <BsLightbulb className="h-4 w-4" />
                </motion.button>
                
                <motion.button 
                  onClick={toggleMinimize}
                  className="text-gray-300 hover:text-white"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {chatMinimized ? <BsChevronUp className="h-4 w-4" /> : <BsChevronDown className="h-4 w-4" />}
                </motion.button>
                
                <motion.button 
                  onClick={toggleFullscreen}
                  className="text-gray-300 hover:text-white"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <BsArrowsFullscreen className="h-4 w-4" />
                </motion.button>
                
                <motion.button 
                  onClick={toggleChatbot}
                  className="text-gray-300 hover:text-white"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <BsX className="h-5 w-5" />
                </motion.button>
              </div>
            </div>

            {/* Resize handle */}
            {!chatMinimized && !isFullscreen && (
              <div 
                className="resize-handle absolute top-1/2 left-0 w-2 h-10 cursor-ew-resize"
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              ></div>
            )}
            
            {!chatMinimized && !isFullscreen && (
              <div 
                className="resize-handle absolute left-0 bottom-0 w-10 h-2 cursor-ns-resize"
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              ></div>
            )}
            
            {!chatMinimized && !isFullscreen && (
              <div 
                className="resize-handle absolute right-0 bottom-0 w-4 h-4 cursor-nwse-resize"
                onMouseDown={handleResizeMouseDown}
              ></div>
            )}

            {/* Demo Controller */}
            <AnimatePresence>
              {!chatMinimized && showDemoController && (
                <motion.div 
                  className="bg-white border-b border-gray-200 p-3"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <DemoController onClose={() => setShowDemoController(false)} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Chatbot content */}
            {!chatMinimized && (
              <div className="bg-white h-[calc(100%-40px)] rounded-b-lg overflow-hidden shadow-2xl">
                <ChatBot />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat button */}
      <AnimatePresence>
        {!showChatbot && (
          <motion.button 
            onClick={toggleChatbot}
            className="fixed bottom-4 right-4 z-50 bg-gray-900 text-white p-4 rounded-full shadow-lg hover:bg-gray-800 transition"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <BsRobot className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Welcome Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <WelcomeModal onClose={closeModal} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;