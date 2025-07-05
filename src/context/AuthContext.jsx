// src/context/AuthContext.jsx
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

// This is the provider component
export function AuthProvider({ children }) {
  // Hardcoded user credentials (for demo purposes only)
  const users = [
    { id: 1, email: 'admin@rajubhai.com', password: 'Admin@123' },
    { id: 2, email: 'user@rajubhai.com', password: 'User@123' }
  ];

  const [currentUser, setCurrentUser] = useState(null);

  const login = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
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