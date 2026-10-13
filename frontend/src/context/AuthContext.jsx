import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('ats_token');
      const storedUser = localStorage.getItem('ats_user');

      if (storedToken && storedUser) {
        try {
          setUser(JSON.parse(storedUser));
          const res = await authApi.getCurrentUser();
          if (res.data?.data) {
            setUser(res.data.data);
            localStorage.setItem('ats_user', JSON.stringify(res.data.data));
          }
        } catch (err) {
          console.warn('Session verification failed, continuing with cached session');
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    const res = await authApi.login({ email, password });
    const data = res.data.data;
    const userData = {
      id: data.id,
      fullName: data.fullName,
      email: data.email,
      role: data.role,
      academicBranch: data.academicBranch || 'B.Tech',
    };
    localStorage.setItem('ats_token', data.token);
    localStorage.setItem('ats_refresh_token', data.refreshToken);
    localStorage.setItem('ats_user', JSON.stringify(userData));
    setUser(userData);
    return userData;
  };

  const register = async (fullName, email, password, confirmPassword, academicBranch = 'B.Tech') => {
    const res = await authApi.register({ fullName, email, password, confirmPassword, academicBranch });
    const data = res.data.data;
    const userData = {
      id: data.id,
      fullName: data.fullName,
      email: data.email,
      role: data.role,
      academicBranch: data.academicBranch || academicBranch || 'B.Tech',
    };
    localStorage.setItem('ats_token', data.token);
    localStorage.setItem('ats_refresh_token', data.refreshToken);
    localStorage.setItem('ats_user', JSON.stringify(userData));
    setUser(userData);
    return userData;
  };

  const logout = () => {
    localStorage.removeItem('ats_token');
    localStorage.removeItem('ats_refresh_token');
    localStorage.removeItem('ats_user');
    setUser(null);
  };

  const isAdmin = user?.role === 'ADMIN';
  const isStudent = user?.role === 'STUDENT';

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAdmin, isStudent }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
