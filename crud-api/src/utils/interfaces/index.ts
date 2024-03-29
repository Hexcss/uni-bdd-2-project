import winston from 'winston';

export interface Environment {
  port: number;
  MONGO_URI: string | undefined;
}

export interface ExtendedLogInfo extends winston.Logform.TransformableInfo {
  httpMethod?: string;
  url?: string;
}
