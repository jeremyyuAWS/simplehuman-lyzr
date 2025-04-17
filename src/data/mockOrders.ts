import { Order } from '../types';

// Function to generate different order sets based on user type
export const getMockOrders = (userType: string = 'regular'): Order[] => {
  switch (userType) {
    case 'premium':
      return premiumUserOrders;
    case 'new':
      return newUserOrders;
    default:
      return regularUserOrders;
  }
};

// Regular user has a mix of recent and older orders with different statuses
export const regularUserOrders: Order[] = [
  {
    orderNumber: 'SH104928',
    status: 'Shipped',
    estimatedDelivery: 'October 15, 2025',
    orderDate: '2025-10-08',
    progressPercentage: 75,
    items: [
      {
        name: '45L Rectangular Sensor Can',
        quantity: 1,
        price: 199.99,
        imageUrl: '/images/Butterfly Step Can.webp'
      },
      {
        name: 'Custom Fit Liner Code K (30-pack)',
        quantity: 1,
        price: 19.99
      }
    ]
  },
  {
    orderNumber: 'SH103755',
    status: 'Delivered',
    estimatedDelivery: 'September 28, 2025',
    orderDate: '2025-09-25',
    progressPercentage: 100,
    items: [
      {
        name: 'Rechargeable Sensor Pump',
        quantity: 2,
        price: 79.99,
        imageUrl: '/images/simplehuman 9 oz. Touch-Free Automatic Rechargeable Sensor Pump.jpg'
      }
    ]
  },
  {
    orderNumber: 'SH102643',
    status: 'Processing',
    estimatedDelivery: 'October 22, 2025',
    orderDate: '2025-10-07',
    progressPercentage: 25,
    items: [
      {
        name: 'Standing Paper Towel Holder with Spray Pump',
        quantity: 1,
        price: 49.99,
        imageUrl: '/images/simplehuman Standing Paper Towel Holder with Spray Pump.jpg'
      }
    ]
  }
];

// Premium user has more and higher-value orders
export const premiumUserOrders: Order[] = [
  {
    orderNumber: 'SH105721',
    status: 'Processing',
    estimatedDelivery: 'October 17, 2025',
    orderDate: '2025-10-12',
    progressPercentage: 15,
    items: [
      {
        name: '58L Dual Compartment Sensor Can',
        quantity: 1,
        price: 229.99,
        imageUrl: '/images/simplehuman 58 Liter : 15.3 Gallon Rectangular Hands-Free Dual Compartment Recycling Kitchen Step Trash Can with Soft-Close Lid.jpg'
      },
      {
        name: 'Custom Fit Liner Code N (30-pack)',
        quantity: 2,
        price: 22.99
      }
    ]
  },
  {
    orderNumber: 'SH105328',
    status: 'Shipped',
    estimatedDelivery: 'October 14, 2025',
    orderDate: '2025-10-05',
    progressPercentage: 65,
    items: [
      {
        name: 'Touch-Free Sensor Pump - Twin Pack',
        quantity: 1,
        price: 149.98,
        imageUrl: '/images/simplehuman 9 oz. Touch-Free Automatic Rechargeable Sensor Pump.jpg'
      },
      {
        name: 'Sensor Pump Soap Refills (3-pack)',
        quantity: 2,
        price: 34.99
      }
    ]
  },
  {
    orderNumber: 'SH104629',
    status: 'Delivered',
    estimatedDelivery: 'October 3, 2025',
    orderDate: '2025-09-30',
    progressPercentage: 100,
    items: [
      {
        name: 'Standing Paper Towel Holder with Spray Pump',
        quantity: 2,
        price: 49.99,
        imageUrl: '/images/simplehuman Standing Paper Towel Holder with Spray Pump.jpg'
      },
      {
        name: 'Stainless Steel Cleaner (8oz)',
        quantity: 1,
        price: 14.99
      }
    ]
  },
  {
    orderNumber: 'SH103995',
    status: 'Delivered',
    estimatedDelivery: 'September 15, 2025',
    orderDate: '2025-09-12',
    progressPercentage: 100,
    items: [
      {
        name: '10L Round Step Can - Rose Gold',
        quantity: 2,
        price: 69.99,
        imageUrl: '/images/Bullet Can.webp'
      }
    ]
  }
];

// New user has only one recent order
export const newUserOrders: Order[] = [
  {
    orderNumber: 'SH105832',
    status: 'Processing',
    estimatedDelivery: 'October 20, 2025',
    orderDate: '2025-10-13',
    progressPercentage: 10,
    items: [
      {
        name: 'Rechargeable Sensor Pump',
        quantity: 1,
        price: 79.99,
        imageUrl: '/images/simplehuman 9 oz. Touch-Free Automatic Rechargeable Sensor Pump.jpg'
      },
      {
        name: 'Sensor Pump Soap Refill',
        quantity: 1,
        price: 12.99
      }
    ]
  }
];

// Warranty registrations
export const mockWarrantyRegistrations = [
  {
    productId: 'tc-01',
    productName: '45L Rectangular Sensor Can',
    serialNumber: 'STC45L-B81249',
    purchaseDate: '2024-08-15',
    expiryDate: '2029-08-15',
    status: 'Active',
    coverageType: '5-Year Limited Warranty',
    imageUrl: '/images/Butterfly Step Can.webp'
  },
  {
    productId: 'sd-01',
    productName: 'Rechargeable Sensor Pump',
    serialNumber: 'SSP01-A53721',
    purchaseDate: '2024-07-10',
    expiryDate: '2026-07-10',
    status: 'Active',
    coverageType: '2-Year Limited Warranty',
    imageUrl: '/images/simplehuman 9 oz. Touch-Free Automatic Rechargeable Sensor Pump.jpg'
  }
];

// Return requests
export const mockReturnRequests = [
  {
    orderNumber: 'SH100857',
    returnRequestId: 'RR378921',
    status: 'Approved',
    createdDate: '2024-07-25',
    reason: 'Changed mind',
    items: [
      {
        name: 'Custom Fit Liner Code N (30-pack)',
        quantity: 1,
        price: 22.99
      }
    ],
    refundAmount: 22.99,
    refundMethod: 'Original payment method'
  }
];

// Export regularUserOrders as mockOrders for backward compatibility
export const mockOrders = regularUserOrders;