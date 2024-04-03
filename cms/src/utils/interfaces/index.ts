import { ReactNode } from "react";

export interface LoginFormState {
  email: string;
  password: string;
}

export interface Environment {
  AUTH_API_URL: string | undefined;
  CRUD_API_URL: string | undefined;
  SECRET_KEY: string | undefined;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export interface DashboardSectionProps {
  title: string;
}

export interface IRecipe {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  tag_ids: string[];
  steps: string[];
  category_id: string;
  createdAt: string; 
  updatedAt: string; 
  authorId: string;
}

export interface ICategory {
  id: string; 
  name: string;
  description?: string; 
}

export interface ITag {
  id: string;
  name: string;
}
