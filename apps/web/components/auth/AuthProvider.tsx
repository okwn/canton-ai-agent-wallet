'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_COOKIE_NAME = 'marcus_auth';
const AUTH_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function setAuthCookie(token: string) {
  document.cookie = `${AUTH_COOKIE_NAME}=${token}; path=/; max-age=${AUTH_COOKIE_MAX_AGE}; SameSite=Lax`;
}

function clearAuthCookie() {
  document.cookie = `${AUTH_COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`;
}

function getAuthCookie(): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(^| )${AUTH_COOKIE_NAME}=([^;]+)`));
  return match ? match[2] : null;
}

// Mock users for demo (in production, this would be a real backend)
const MOCK_USERS: Record<string, { password: string; user: User }> = {
  'demo@marcus.ai': {
    password: 'demo123',
    user: { id: '1', email: 'demo@marcus.ai', name: 'Demo User' },
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const token = getAuthCookie();
    if (token) {
      try {
        // Decode mock token (format: base64 email)
        const decoded = atob(token);
        const mockUser = MOCK_USERS[decoded];
        if (mockUser) {
          setUser(mockUser.user);
        }
      } catch {
        clearAuthCookie();
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 500));

    const mockUser = MOCK_USERS[email.toLowerCase()];
    if (!mockUser || mockUser.password !== password) {
      setIsLoading(false);
      return { success: false, error: 'Invalid email or password' };
    }

    // Create mock token (base64 email)
    const token = btoa(email.toLowerCase());
    setAuthCookie(token);
    setUser(mockUser.user);
    setIsLoading(false);
    return { success: true };
  };

  const register = async (email: string, password: string, name: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 500));

    const emailLower = email.toLowerCase();
    if (MOCK_USERS[emailLower]) {
      setIsLoading(false);
      return { success: false, error: 'An account with this email already exists' };
    }

    // Create new mock user
    const newUser: User = { id: Date.now().toString(), email: emailLower, name };
    MOCK_USERS[emailLower] = { password, user: newUser };

    // Auto-login after registration
    const token = btoa(emailLower);
    setAuthCookie(token);
    setUser(newUser);
    setIsLoading(false);
    return { success: true };
  };

  const logout = () => {
    clearAuthCookie();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
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
