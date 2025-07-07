import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock authentication - In production, this would connect to your backend API
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    // Mock login logic - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user data based on username
    const mockUser: User = {
      id: '1',
      username,
      email: `${username}@example.com`,
      firstName: username === 'admin' ? 'System' : 'John',
      lastName: username === 'admin' ? 'Administrator' : 'Doe',
      role: username === 'admin' ? 'admin' : 
            username === 'supervisor' ? 'supervisor' : 'enumerator',
      status: 'active',
      createdAt: new Date().toISOString(),
      jurisdictionCode: username === 'admin' ? 'ALL' : 'REG001'
    };

    if (password === 'password') {
      setUser(mockUser);
      localStorage.setItem('currentUser', JSON.stringify(mockUser));
      setLoading(false);
      return true;
    }
    
    setLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};