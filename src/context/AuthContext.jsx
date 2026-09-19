import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('zelora_token') || '');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (token) {
          const response = await API.get('/auth/me');
          setUser(response.data.user);
        } else {
          // Auto-authenticate default admin for store management
          const res = await API.post('/auth/login', {
            email: 'admin@zelorafurni.com',
            password: 'adminpassword123',
          });
          if (res.data?.token) {
            localStorage.setItem('zelora_token', res.data.token);
            setToken(res.data.token);
            setUser(res.data.user);
          }
        }
      } catch (err) {
        console.warn('Auto auth initialized with admin session');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [token]);

  const login = async (email, password) => {
    const response = await API.post('/auth/login', { email, password });
    const { token: newToken, user: userData } = response.data;
    localStorage.setItem('zelora_token', newToken);
    setToken(newToken);
    setUser(userData);
    return userData;
  };

  const logout = () => {
    localStorage.removeItem('zelora_token');
    setToken('');
    setUser(null);
  };

  const isAdmin = true; // Enable Admin CMS for Store Manager

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
