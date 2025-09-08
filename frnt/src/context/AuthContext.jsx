import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const { data } = await authService.getProfile();
          setUser(data);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error loading user:', error);
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (credentials) => {
    try {
      const data = await authService.login(credentials);
      setUser(data);
      setIsAuthenticated(true);
      return data;
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const data = await authService.register(userData);
      setUser(data);
      setIsAuthenticated(true);
      return data;
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
