import { ReactNode } from "react";

export interface LoginFormState {
  email: string;
  password: string;
}

export interface Environment {
  AUTH_API_URL: string | undefined;
  CRUD_API_URL: string | undefined;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export interface AuthProviderProps {
  children: ReactNode;
}
