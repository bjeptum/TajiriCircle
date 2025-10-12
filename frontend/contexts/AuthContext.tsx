import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../lib/api';

interface User {
  id: number;
  phone: string;
  name?: string;
  email?: string;
  business_name?: string;
  business_type?: string;
  location?: string;
  green_score?: number;
  is_verified?: boolean;
}

interface BankUser {
  id: number;
  email: string;
  name: string;
  role: string;
  permissions: string[];
  bank_branch?: string;
  employee_id?: string;
}

interface AuthContextType {
  user: User | null;
  bankUser: BankUser | null;
  isAuthenticated: boolean;
  isBankUser: boolean;
  login: (phone: string, password: string) => Promise<void>;
  bankLogin: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (phone: string, password: string) => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
  token: string | null;
  bankToken: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [bankUser, setBankUser] = useState<BankUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [bankToken, setBankToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isBankUser, setIsBankUser] = useState(false);

  // Load stored authentication data on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('tajiri_token');
    const storedUser = localStorage.getItem('tajiri_user');
    const storedBankToken = localStorage.getItem('bankToken');
    const storedBankUser = localStorage.getItem('bankUser');

    if (storedToken && storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setToken(storedToken);
        setIsAuthenticated(true);
        setIsBankUser(false);
      } catch (error) {
        console.error('Failed to parse stored user data:', error);
        localStorage.removeItem('tajiri_token');
        localStorage.removeItem('tajiri_user');
      }
    }

    if (storedBankToken && storedBankUser) {
      try {
        const bankUserData = JSON.parse(storedBankUser);
        setBankUser(bankUserData);
        setBankToken(storedBankToken);
        setIsAuthenticated(true);
        setIsBankUser(true);
      } catch (error) {
        console.error('Failed to parse stored bank user data:', error);
        localStorage.removeItem('bankToken');
        localStorage.removeItem('bankUser');
      }
    }
  }, []);

  const login = async (phone: string, password: string) => {
    try {
      const response = await apiService.login({ phone, password });
      const { user: userData, access_token } = response;
      
      setUser(userData);
      setToken(access_token);
      setIsAuthenticated(true);
      setIsBankUser(false);
      
      // Store in localStorage
      localStorage.setItem('tajiri_token', access_token);
      localStorage.setItem('tajiri_user', JSON.stringify(userData));
      
      // Clear bank data if any
      localStorage.removeItem('bankToken');
      localStorage.removeItem('bankUser');
      setBankUser(null);
      setBankToken(null);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const bankLogin = async (email: string, password: string) => {
    try {
      const response = await apiService.bankLogin(email, password);
      const { user: bankUserData, access_token } = response;
      
      setBankUser(bankUserData);
      setBankToken(access_token);
      setIsAuthenticated(true);
      setIsBankUser(true);
      
      // Store in localStorage
      localStorage.setItem('bankToken', access_token);
      localStorage.setItem('bankUser', JSON.stringify(bankUserData));
      
      // Clear regular user data if any
      localStorage.removeItem('tajiri_token');
      localStorage.removeItem('tajiri_user');
      setUser(null);
      setToken(null);
    } catch (error) {
      console.error('Bank login failed:', error);
      throw error;
    }
  };

  const register = async (phone: string, password: string) => {
    try {
      const userData = await apiService.register({ phone, password });
      setUser(userData);
      setIsAuthenticated(true);
      setIsBankUser(false);
      
      // Note: Registration might not immediately return a token
      // You might need to call login after successful registration
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setBankUser(null);
    setToken(null);
    setBankToken(null);
    setIsAuthenticated(false);
    setIsBankUser(false);
    
    // Clear localStorage
    localStorage.removeItem('tajiri_token');
    localStorage.removeItem('tajiri_user');
    localStorage.removeItem('bankToken');
    localStorage.removeItem('bankUser');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('tajiri_user', JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    user,
    bankUser,
    isAuthenticated,
    isBankUser,
    login,
    bankLogin,
    logout,
    register,
    updateUser,
    token,
    bankToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};