import winston from 'winston';

export interface Environment {
  port: number;
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
