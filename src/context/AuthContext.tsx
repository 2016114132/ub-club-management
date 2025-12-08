'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { User } from '@/types';

// Default users for demo
const DEMO_USERS: Record<string, User> = {
  student: {
    id: 'user-1',
    name: 'Jane Doe',
    email: 'jane.doe@ub.edu.bz',
    studentId: '2025123456',
    avatar: '',
    role: 'student',
    clubs: ['acm', 'robotics'],
    createdAt: '2024-01-15T00:00:00Z',
  },
  admin: {
    id: 'admin-1',
    name: 'Admin User',
    email: 'admin@ub.edu.bz',
    studentId: 'ADMIN001',
    avatar: '',
    role: 'admin',
    clubs: [],
    createdAt: '2024-01-01T00:00:00Z',
  },
};

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (role: 'student' | 'admin') => void;
  logout: () => void;
  switchRole: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'ubcms_current_user';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, [user, isLoaded]);

  const login = useCallback((role: 'student' | 'admin') => {
    setUser(DEMO_USERS[role]);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const switchRole = useCallback(() => {
    if (user) {
      const newRole = user.role === 'student' ? 'admin' : 'student';
      setUser(DEMO_USERS[newRole]);
    }
  }, [user]);

  const value = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    login,
    logout,
    switchRole,
  };

  // Don't render until we've checked localStorage
  if (!isLoaded) {
    return null;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
