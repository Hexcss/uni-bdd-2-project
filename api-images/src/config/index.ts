import dotenv from 'dotenv';
import { ensureVariableIsSet, parseNumber } from '../utils/functions';
import { Environment } from '../utils/interfaces';

dotenv.config();

export const environment: Environment = {
  PORT: parseNumber(process.env.PORT, '8080'),
  MONGO_URI: process.env.MONGO_URI,
  JWT_KEY: process.env.JWT_KEY,
  NODE_ENV: process.env.NODE_ENV || 'development',
};

ensureVariableIsSet(environment.MONGO_URI, 'MONGO_URI');
