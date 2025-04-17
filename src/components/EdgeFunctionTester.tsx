import React, { useState } from 'react';
import { callChatInference, convertApiResponseToMessage } from '../services/chatService';
import { Message } from '../types';
import { BsPlayFill, BsCheck2Circle, BsXCircle } from 'react-icons/bs';

interface TestResult {
  success: boolean;
  message: string;
  response?: any;
  error?: string;
}

export const EdgeFunctionTester: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<TestResult[]>([]);
  
  const runTest = async () => {
    setIsLoading(true);
    setResults([]);
    
    try {
      // Test 1: Basic Connection Test
      try {
        const testMessage = "Hello, I need a trash can";
        const response = await callChatInference(testMessage);
        
        setResults(prev => [...prev, {
          success: true,
          message: "Connection to Supabase Edge Function successful",
          response
        }]);
        
        // Test 2: Intent Classification Test
        if (response.context.customer_intent) {
          setResults(prev => [...prev, {
            success: true,
            message: `Intent classification working: "${response.context.customer_intent}"`,
          }]);
        } else {
          setResults(prev => [...prev, {
            success: false,
            message: "Intent classification test failed - no intent returned",
          }]);
        }
        
        // Test 3: Response Format Test
        try {
          const message = convertApiResponseToMessage(response);
          setResults(prev => [...prev, {
            success: true,
            message: "Response conversion successful",
            response: message
          }]);
        } catch (error) {
          setResults(prev => [...prev, {
            success: false,
            message: "Response conversion failed",
            error: error instanceof Error ? error.message : String(error)
          }]);
        }
        
        // Test 4: Rich Content Test
        if (response.message.rich_content || response.message.suggestions) {
          setResults(prev => [...prev, {
            success: true,
            message: "Rich content and/or suggestions detected in response",
          }]);
        } else {
          setResults(prev => [...prev, {
            success: false,
            message: "No rich content or suggestions detected",
          }]);
        }
      } catch (error) {
        setResults(prev => [...prev, {
          success: false,
          message: "Connection to Supabase Edge Function failed",
          error: error instanceof Error ? error.message : String(error)
        }]);
      }
      
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Supabase Edge Function Tester</h2>
      
      <div className="flex items-center mb-6">
        <button 
          onClick={runTest}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Running Tests...
            </>
          ) : (
            <>
              <BsPlayFill className="mr-2" />
              Run Connectivity Test
            </>
          )}
        </button>
        
        <div className="ml-4 text-sm text-gray-600">
          Tests connection to the Supabase Edge Function
        </div>
      </div>
      
      {results.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Test Results</h3>
          
          <div className="border rounded-md overflow-hidden">
            {results.map((result, index) => (
              <div 
                key={index} 
                className={`p-4 ${index !== results.length - 1 ? 'border-b' : ''} ${result.success ? 'bg-green-50' : 'bg-red-50'}`}
              >
                <div className="flex items-center">
                  {result.success ? (
                    <BsCheck2Circle className="text-green-600 h-5 w-5 mr-2" />
                  ) : (
                    <BsXCircle className="text-red-600 h-5 w-5 mr-2" />
                  )}
                  <span className={`font-medium ${result.success ? 'text-green-800' : 'text-red-800'}`}>
                    {result.message}
                  </span>
                </div>
                
                {result.error && (
                  <div className="mt-2 p-2 bg-red-100 text-red-800 rounded text-sm font-mono overflow-x-auto">
                    {result.error}
                  </div>
                )}
                
                {result.response && (
                  <div className="mt-2">
                    <details>
                      <summary className="cursor-pointer text-blue-600 text-sm">View Response</summary>
                      <div className="mt-2 p-2 bg-gray-100 rounded text-sm font-mono max-h-40 overflow-auto">
                        <pre>{JSON.stringify(result.response, null, 2)}</pre>
                      </div>
                    </details>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="mt-6 text-sm text-gray-600">
        <p><strong>Note:</strong> This tester sends a sample message to the Supabase Edge Function and validates if:</p>
        <ol className="list-decimal list-inside pl-4 mt-2 space-y-1">
          <li>The function is accessible and returns a response</li>
          <li>The intent classification is working</li>
          <li>The response can be converted to the app's message format</li>
          <li>The response includes rich content or suggestions</li>
        </ol>
      </div>
    </div>
  );
};