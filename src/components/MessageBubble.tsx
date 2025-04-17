import React, { useEffect, useRef } from 'react';
import { Message, ProductOption, Order, WarrantyRegistration, ReturnRequest } from '../types';
import { BsRobot, BsPerson, BsBoxSeam, BsTruck, BsCheckCircle, BsArrowRight } from 'react-icons/bs';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

interface MessageBubbleProps {
  message: Message;
  isLatest: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isLatest }) => {
  const isUser = message.sender === 'user';
  const messageRef = useRef<HTMLDivElement>(null);
  
  // Scroll into view if this is the latest message
  useEffect(() => {
    if (isLatest && messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isLatest]);
  
  const renderMessageContent = () => {
    if (typeof message.content === 'string') {
      return <p className="whitespace-pre-wrap">{message.content}</p>;
    } else if (message.type === 'product-options') {
      return (
        <div className="space-y-2">
          <p className="font-medium mb-2">{message.content.question}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {message.content.options.map((option, index) => (
              <motion.button
                key={index}
                className="bg-white border border-gray-200 rounded-md p-2 text-left hover:bg-gray-50 transition"
                onClick={() => option.onClick && option.onClick()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {option.label}
              </motion.button>
            ))}
          </div>
        </div>
      );
    } else if (message.type === 'product-recommendation') {
      return (
        <div className="space-y-4">
          <p className="mb-2">{message.content.introText}</p>
          <div className="space-y-4">
            {message.content.products.map((product, index) => (
              <motion.div 
                key={index} 
                className="bg-white border border-gray-200 rounded-md overflow-hidden"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="flex">
                  <div className="w-24 h-24 flex-shrink-0 bg-gray-100">
                    {product.imageUrl && (
                      <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null; // Prevent infinite error loop
                          target.src = 'https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
                        }}
                      />
                    )}
                  </div>
                  <div className="p-3 flex-grow">
                    <h4 className="font-medium text-gray-900">{product.name}</h4>
                    <p className="text-sm text-gray-600">{product.description}</p>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-sm font-medium">${product.price}</span>
                      <motion.button 
                        className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 transition"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View Details
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-2">
            <p className="text-sm text-gray-600">Would you like more details on any of these products?</p>
          </div>
        </div>
      );
    } else if (message.type === 'product-comparison') {
      return (
        <div className="space-y-4">
          <p className="mb-2">{message.content.introText}</p>
          <div className="space-y-4">
            {message.content.products.map((product, index) => (
              <motion.div 
                key={index} 
                className="bg-white border border-gray-200 rounded-md overflow-hidden"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
              >
                <div className="flex">
                  <div className="w-24 h-24 flex-shrink-0 bg-gray-100">
                    {product.imageUrl && (
                      <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = 'https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
                        }}
                      />
                    )}
                  </div>
                  <div className="p-3 flex-grow">
                    <h4 className="font-medium text-gray-900">{product.name}</h4>
                    <p className="text-sm text-gray-600">{product.description}</p>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-sm font-medium">${product.price}</span>
                      <motion.button 
                        className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 transition"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View Details
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full mt-4 border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feature</th>
                  {message.content.products.map((product, index) => (
                    <th key={index} className="p-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {product.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {message.content.comparisonPoints.map((point, index) => (
                  <motion.tr 
                    key={index} 
                    className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <td className="p-2 whitespace-nowrap text-sm font-medium text-gray-900">{point.name}</td>
                    {message.content.products.map((product, productIndex) => (
                      <td key={productIndex} className="p-2 whitespace-nowrap text-sm text-gray-500">
                        {typeof point.values[product.id] === 'boolean' 
                          ? (point.values[product.id] ? '✓' : '✗') 
                          : point.values[product.id]}
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-2">
            <p className="text-sm text-gray-600">Which features are most important to you?</p>
          </div>
        </div>
      );
    } else if (message.type === 'troubleshooting') {
      return (
        <div className="space-y-3">
          <p>{message.content.introText}</p>
          <div className="space-y-2">
            {message.content.steps.map((step, index) => (
              <motion.div 
                key={index} 
                className="bg-white border border-gray-200 rounded-md p-3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 }}
              >
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center mr-2 text-xs">
                    {index + 1}
                  </div>
                  <p>{step}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="text-sm mt-3">
            {message.content.additionalHelp && (
              <>
                {message.content.additionalHelp}
                {message.content.supportLink && (
                  <a href="#" className="text-blue-600 ml-1 hover:underline">
                    View support article
                  </a>
                )}
              </>
            )}
          </p>
        </div>
      );
    } else if (message.type === 'order-tracking') {
      const order = message.content.order;
      return (
        <div className="space-y-3">
          <p className="mb-2">{message.content.introText}</p>
          <motion.div 
            className="bg-white border border-gray-200 rounded-md p-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Order #:</span>
                <span className="font-medium">{order.orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Status:</span>
                <span className="font-medium">{order.status}</span>
              </div>
              {order.orderDate && (
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Order Date:</span>
                  <span className="font-medium">{order.orderDate}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Estimated Delivery:</span>
                <span className="font-medium">{order.estimatedDelivery}</span>
              </div>
            </div>
            <div className="mt-3 pt-2 border-t">
              <div className="relative">
                <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                  <motion.div 
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gray-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${order.progressPercentage}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                  ></motion.div>
                </div>
                <div className="flex justify-between text-xs text-gray-600 mt-1">
                  <span>Order Placed</span>
                  <span>Processing</span>
                  <span>Shipped</span>
                  <span>Delivered</span>
                </div>
              </div>
            </div>
            
            {/* Order items */}
            <div className="mt-3 pt-2 border-t">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Items:</h4>
              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    {item.imageUrl && (
                      <div className="w-10 h-10 flex-shrink-0 mr-3 bg-gray-100 rounded">
                        <img 
                          src={item.imageUrl} 
                          alt={item.name} 
                          className="h-full w-full object-cover rounded"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = 'https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
                          }}
                        />
                      </div>
                    )}
                    <div className="flex-1 flex justify-between">
                      <span className="text-sm">{item.quantity}x {item.name}</span>
                      <span className="text-sm font-medium">${item.price.toFixed(2)}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
          <p className="text-sm">
            Need more assistance with your order? <a href="#" className="text-blue-600 hover:underline">Contact support</a>
          </p>
        </div>
      );
    } else if (message.type === 'order-history') {
      const orders = message.content.orders;
      return (
        <div className="space-y-3">
          <p className="mb-2">{message.content.introText}</p>
          <div className="space-y-3">
            {orders.map((order, index) => (
              <motion.div 
                key={order.orderNumber}
                className="bg-white border border-gray-200 rounded-md overflow-hidden"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="p-3">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-gray-900">Order #{order.orderNumber}</h4>
                    <div className={`text-xs px-2 py-1 rounded-full ${
                      order.status === 'Delivered' 
                        ? 'bg-green-100 text-green-800' 
                        : order.status === 'Shipped' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    {order.orderDate && <span className="mr-3">Ordered: {order.orderDate}</span>}
                    <span>Delivery: {order.estimatedDelivery}</span>
                  </div>
                  
                  {/* First item preview with image */}
                  {order.items.length > 0 && (
                    <div className="flex items-center mt-3 pt-2 border-t border-gray-100">
                      {order.items[0].imageUrl && (
                        <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0 bg-gray-100">
                          <img 
                            src={order.items[0].imageUrl} 
                            alt={order.items[0].name} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.onerror = null;
                              target.src = 'https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
                            }}
                          />
                        </div>
                      )}
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900">{order.items[0].name}</p>
                        <p className="text-xs text-gray-500">
                          {order.items[0].quantity} x ${order.items[0].price.toFixed(2)}
                          {order.items.length > 1 && ` + ${order.items.length - 1} more item${order.items.length > 2 ? 's' : ''}`}
                        </p>
                      </div>
                      <div className="ml-3">
                        <button className="text-xs flex items-center text-blue-600 hover:underline">
                          View Details <BsArrowRight className="ml-1" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Order status bar */}
                <div className="h-1.5 w-full bg-gray-100">
                  <div 
                    className={`h-full ${
                      order.status === 'Delivered' 
                        ? 'bg-green-500' 
                        : order.status === 'Shipped' 
                          ? 'bg-blue-500' 
                          : 'bg-yellow-500'
                    }`} 
                    style={{ width: `${order.progressPercentage}%` }}
                  ></div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-3">
            <p className="text-sm">
              Want to track a specific order in detail? Just let me know the order number!
            </p>
          </div>
        </div>
      );
    } else if (message.type === 'warranty') {
      return (
        <div className="space-y-3">
          <p className="mb-2">{message.content.introText}</p>
          <div className="space-y-3">
            {message.content.registrations.map((registration, index) => (
              <motion.div 
                key={index} 
                className="bg-white border border-gray-200 rounded-md p-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="flex">
                  {registration.imageUrl && (
                    <div className="w-16 h-16 flex-shrink-0 mr-3 bg-gray-100 rounded">
                      <img 
                        src={registration.imageUrl}
                        alt={registration.productName}
                        className="w-full h-full object-cover rounded"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = 'https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
                        }}
                      />
                    </div>
                  )}
                  <div className="space-y-2 flex-1">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-900">{registration.productName}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${registration.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {registration.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                      <div>
                        <span className="text-gray-600">Serial #:</span>
                        <span className="ml-1 font-medium">{registration.serialNumber}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Coverage:</span>
                        <span className="ml-1 font-medium">{registration.coverageType}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Purchased:</span>
                        <span className="ml-1 font-medium">{registration.purchaseDate}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Expires:</span>
                        <span className="ml-1 font-medium">{registration.expiryDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="text-sm">
            {message.content.additionalHelp}
          </p>
        </div>
      );
    } else if (message.type === 'return') {
      return (
        <div className="space-y-3">
          <p className="mb-2">{message.content.introText}</p>
          
          {message.content.request && (
            <motion.div 
              className="bg-white border border-gray-200 rounded-md p-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Return ID:</span>
                  <span className="font-medium">{message.content.request.returnRequestId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Status:</span>
                  <span className={`font-medium ${message.content.request.status === 'Approved' ? 'text-green-600' : 'text-yellow-600'}`}>
                    {message.content.request.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Order #:</span>
                  <span className="font-medium">{message.content.request.orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Refund Amount:</span>
                  <span className="font-medium">${message.content.request.refundAmount.toFixed(2)}</span>
                </div>
              </div>
            </motion.div>
          )}
          
          {message.content.steps && (
            <div className="space-y-2 mt-3">
              <h4 className="text-sm font-medium">Return Steps:</h4>
              {message.content.steps.map((step, index) => (
                <motion.div 
                  key={index} 
                  className="bg-white border border-gray-200 rounded-md p-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15 }}
                >
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center mr-2 text-xs">
                      {index + 1}
                    </div>
                    <p>{step}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          
          {message.content.policy && (
            <motion.div 
              className="bg-gray-50 p-3 rounded-md text-sm text-gray-700 mt-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p><strong>Return Policy:</strong> {message.content.policy}</p>
            </motion.div>
          )}
        </div>
      );
    } else if (message.type === 'login-required') {
      return (
        <div className="space-y-2">
          <p>{message.content.message}</p>
          <motion.button 
            className="px-3 py-1 mt-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            onClick={() => message.content.loginAction && message.content.loginAction()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign In
          </motion.button>
        </div>
      );
    }

    // If there's an image in the message and it's not a special type
    if (message.image) {
      return (
        <div className="space-y-4">
          <p className="whitespace-pre-wrap">{String(message.content)}</p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <img 
              src={message.image} 
              alt="Product" 
              className="max-h-40 rounded-md object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = 'https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
              }}
            />
          </motion.div>
        </div>
      );
    }
    
    return <p>{String(message.content)}</p>;
  };

  const bubbleClasses = classNames(
    'rounded-lg p-3 max-w-[80%]',
    {
      'bg-gray-900 text-white': isUser,
      'bg-gray-100 text-gray-800': !isUser,
      'border-l-4 border-yellow-500': message.requiresAuth && !isUser
    }
  );

  const animationVariants = {
    initial: { 
      opacity: 0, 
      y: 10,
      x: isUser ? 10 : -10,
    },
    animate: { 
      opacity: 1, 
      y: 0,
      x: 0,
    }
  };

  return (
    <motion.div 
      className={`flex ${isUser ? 'justify-end' : 'items-start'}`}
      ref={messageRef}
      initial="initial"
      animate="animate"
      variants={animationVariants}
      transition={{ duration: 0.3 }}
    >
      {!isUser && (
        <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-2 flex-shrink-0">
          <BsRobot className="h-5 w-5 text-gray-600" />
        </div>
      )}
      
      <div className={bubbleClasses}>
        {renderMessageContent()}
      </div>
      
      {isUser && (
        <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center ml-2 flex-shrink-0">
          <BsPerson className="h-5 w-5 text-white" />
        </div>
      )}
    </motion.div>
  );
};