import React, { createContext, useState, useEffect, useContext } from 'react';
import { login, register, getCurrentUser } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          const userData = await getCurrentUser();
          setCurrentUser(userData);
        } catch (err) {
          console.error('Failed to load user:', err);
          localStorage.removeItem('token');
        }
      }
      
      setLoading(false);
    };

    loadUser();
  }, []);

  const loginUser = async (email, password) => {
    setError(null);
    try {
      const data = await login({ email, password });
      localStorage.setItem('token', data.token);
      const userData = await getCurrentUser();
      setCurrentUser(userData);
      return userData;
    } catch (err) {
      setError(err.msg || 'Login failed');
      throw err;
    }
  };

  const registerUser = async (name, username, email, password) => {
    setError(null);
    try {
      const data = await register({ name, username, email, password });
      localStorage.setItem('token', data.token);
      const userData = await getCurrentUser();
      setCurrentUser(userData);
      return userData;
    } catch (err) {
      setError(err.msg || 'Registration failed');
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    loading,
    error,
    loginUser,
    registerUser,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
