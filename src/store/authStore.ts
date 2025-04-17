import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  isDemo?: boolean;
  demoType?: 'regular' | 'premium' | 'new';
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (user: User) => void;
  loginDemo: (demoType: 'regular' | 'premium' | 'new') => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: (user: User) => set({ isAuthenticated: true, user }),
  loginDemo: (demoType: 'regular' | 'premium' | 'new') => {
    const demoUsers = {
      regular: {
        id: 'demo-regular-1',
        name: 'Sam Johnson',
        email: 'sam.johnson@example.com',
        isDemo: true,
        demoType: 'regular'
      },
      premium: {
        id: 'demo-premium-1',
        name: 'Taylor Reynolds',
        email: 'taylor@example.com',
        isDemo: true,
        demoType: 'premium'
      },
      new: {
        id: 'demo-new-1',
        name: 'Jordan Smith',
        email: 'jordan@example.com',
        isDemo: true,
        demoType: 'new'
      }
    };
    
    set({ isAuthenticated: true, user: demoUsers[demoType] });
  },
  logout: () => set({ isAuthenticated: false, user: null }),
}));