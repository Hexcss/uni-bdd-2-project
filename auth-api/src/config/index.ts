import dotenv from 'dotenv';
import { ensureVariableIsSet, parsePort } from '../utils/functions';
import { Environment } from '../utils/interfaces';

dotenv.config();

export const environment: Environment = {
  port: parsePort(process.env.PORT),
  MONGO_URI: process.env.MONGO_URI,
  JWT_KEY: process.env.JWT_KEY,
  JWT_ALGORITHM: process.env.JWT_ALGORITHM,
};

ensureVariableIsSet(environment.MONGO_URI, 'MONGO_URI');
ensureVariableIsSet(environment.JWT_KEY, 'JWT_KEY');
ensureVariableIsSet(environment.JWT_ALGORITHM, 'JWT_ALGORITHM');
