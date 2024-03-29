import dotenv from 'dotenv';
import { ensureVariableIsSet, parsePort } from '../utils/functions';
import { Environment } from '../utils/interfaces';

dotenv.config();

export const environment: Environment = {
  port: parsePort(process.env.PORT),
  MONGO_URI: process.env.MONGO_URI,
};

ensureVariableIsSet(environment.MONGO_URI, 'MONGO_URI');
