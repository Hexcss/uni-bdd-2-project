import { Document } from 'mongoose';
import winston from 'winston';

export interface Environment {
  port: number;
  MONGO_URI: string | undefined;
  JWT_KEY: string | undefined;
  JWT_ALGORITHM: string | undefined;
}

export interface ExtendedLogInfo extends winston.Logform.TransformableInfo {
  httpMethod?: string;
  url?: string;
}

export interface CustomError extends Error {
  statusCode?: number;
}

export interface IUser extends Document {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface IRegister {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface ILogin {
  email: string;
  password: string;
}
