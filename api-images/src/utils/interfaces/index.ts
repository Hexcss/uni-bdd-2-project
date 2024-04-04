import winston from 'winston';
import { Document } from 'mongoose';

export interface Environment {
  PORT: number;
  MONGO_URI: string | undefined;
  JWT_KEY: string | undefined;
  NODE_ENV: string | undefined;
}

export interface ExtendedLogInfo extends winston.Logform.TransformableInfo {
  httpMethod?: string;
  url?: string;
}

export interface CustomError extends Error {
  statusCode?: number;
}

export interface ICategoryImage extends Document {
  category_id: string;
  imageData: Buffer;
  imageName: string;
}

export interface IRecipeImage extends Document {
  recipe_id: string;
  imageData: Buffer;
  imageName: string;
}
