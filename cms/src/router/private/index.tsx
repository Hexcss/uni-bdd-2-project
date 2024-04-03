import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context'; // Adjust the import path according to your project structure

interface PrivateRouteProps {
  children: JSX.Element;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};
