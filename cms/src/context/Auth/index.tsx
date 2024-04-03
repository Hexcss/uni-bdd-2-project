import React, { createContext, useState } from 'react';
import { AuthContextType, AuthProviderProps } from "../../utils/interfaces";
import { jwtDecode } from 'jwt-decode';
import { decryptToken, encryptToken } from '../../utils/functions';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [encryptedToken, setEncryptedToken] = useState<string | null>(localStorage.getItem('token'));

  const token = encryptedToken ? decryptToken(encryptedToken) : null;
  const isAuthenticated = !!token && !isTokenExpired(token);

  function login(newToken: string) {
    const encrypted = encryptToken(newToken);
    localStorage.setItem('token', encrypted);
    setEncryptedToken(encrypted);
  }

  function logout() {
    localStorage.removeItem('token');
    setEncryptedToken(null);
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

