import React, { createContext, useState } from 'react';
import { AuthContextType, AuthProviderProps } from "../../utils/interfaces";
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  const isAuthenticated = !!token && !isTokenExpired(token);

  function login(newToken: string) {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  }

  function logout() {
    localStorage.removeItem('token');
    setToken(null);
  }

  function isTokenExpired(token: string): boolean {
    const decoded: { exp: number } = jwtDecode(token);
    if (decoded.exp < Date.now() / 1000) {
      logout();
      return true;
    }
    return false;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

