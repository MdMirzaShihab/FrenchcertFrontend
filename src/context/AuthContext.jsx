// src/context/AuthContext.jsx
import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../secrets';

const AuthContext = createContext();

// Every axios call in the app sends the saved token
const setToken = (token) => {
  if (token) axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  else delete axios.defaults.headers.common.Authorization;
};

const loadUser = () => {
  try {
    return JSON.parse(localStorage.getItem('auth'));
  } catch {
    return null;
  }
};

const saved = loadUser();
setToken(saved?.token);

// Expired or invalid token: clear it and go back to the login page
axios.interceptors.response.use(undefined, (error) => {
  if (error.response?.status === 401 && localStorage.getItem('auth')) {
    localStorage.removeItem('auth');
    window.location.href = '/login';
  }
  return Promise.reject(error);
});

// This is the provider component
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(saved?.user ?? null);

  const logout = () => {
    localStorage.removeItem('auth');
    setToken(null);
    setCurrentUser(null);
  };

  const login = async (email, password) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/api/auth/login`, { email, password });
      if (data.user.role !== 'admin') return false;
      localStorage.setItem('auth', JSON.stringify({ token: data.token, user: data.user }));
      setToken(data.token);
      setCurrentUser(data.user);
      return true;
    } catch (err) {
      if (err.response?.status === 401) return false;
      throw new Error(err.response?.data?.error || err.message);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
