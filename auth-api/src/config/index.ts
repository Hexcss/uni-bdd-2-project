import dotenv from 'dotenv';
import { ensureVariableIsSet, parseNumber } from '../utils/functions';
import { Environment } from '../utils/interfaces';

dotenv.config();

export const environment: Environment = {
  port: parseNumber(process.env.PORT, '8080'),
  MONGO_URI: process.env.MONGO_URI,
  JWT_KEY: process.env.JWT_KEY,
  JWT_ALGORITHM: process.env.JWT_ALGORITHM,
  SALT_ROUNDS: parseNumber(process.env.SALT_ROUNDS, '10'),
};

ensureVariableIsSet(environment.MONGO_URI, 'MONGO_URI');
ensureVariableIsSet(environment.JWT_KEY, 'JWT_KEY');
ensureVariableIsSet(environment.JWT_ALGORITHM, 'JWT_ALGORITHM');
