import React, { useState } from 'react';
import { BsX, BsEnvelope, BsLock, BsPersonCircle } from 'react-icons/bs';
import { useAuthStore } from '../store/authStore';

interface LoginPromptProps {
  onClose: () => void;
}

export const LoginPrompt: React.FC<LoginPromptProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { login, loginDemo } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would be an API call to authenticate
      if (email && password) {
        login({
          id: '1',
          name: email.split('@')[0],
          email
        });
        onClose();
      } else {
        setError('Please enter both email and password');
      }
    } catch (err) {
      setError('Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (type: 'regular' | 'premium' | 'new') => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      loginDemo(type);
      onClose();
    } catch (err) {
      setError('Demo login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-xl font-medium text-gray-900">Sign In</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <BsX className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-5">
          <p className="text-gray-600 mb-4">
            Sign in to access your order history, track shipments, and manage your warranty information.
          </p>
          
          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <BsEnvelope className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-gray-400"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <BsLock className="text-gray-400" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-gray-400"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </div>
          </form>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with demo accounts</span>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-1 gap-3">
              <button
                onClick={() => handleDemoLogin('regular')}
                className="flex justify-between items-center w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <div className="flex items-center">
                  <BsPersonCircle className="text-gray-500 mr-2" />
                  <span>Regular Customer</span>
                </div>
                <span className="text-xs text-gray-500">3 previous orders</span>
              </button>
              <button
                onClick={() => handleDemoLogin('premium')}
                className="flex justify-between items-center w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <div className="flex items-center">
                  <BsPersonCircle className="text-blue-500 mr-2" />
                  <span>Premium Customer</span>
                </div>
                <span className="text-xs text-gray-500">Frequent buyer</span>
              </button>
              <button
                onClick={() => handleDemoLogin('new')}
                className="flex justify-between items-center w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <div className="flex items-center">
                  <BsPersonCircle className="text-green-500 mr-2" />
                  <span>New Customer</span>
                </div>
                <span className="text-xs text-gray-500">First purchase</span>
              </button>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="#" className="text-blue-600 hover:underline">
                Create one
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};