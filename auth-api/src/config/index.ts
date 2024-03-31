import dotenv from 'dotenv';
import { ensureVariableIsSet, parseNumber } from '../utils/functions';
import { Environment } from '../utils/interfaces';

dotenv.config();

export const environment: Environment = {
  PORT: parseNumber(process.env.PORT, '8080'),
  MONGO_URI: process.env.MONGO_URI,
  JWT_KEY: process.env.JWT_KEY,
  JWT_ALGORITHM: process.env.JWT_ALGORITHM,
  SALT_ROUNDS: parseNumber(process.env.SALT_ROUNDS, '10'),
  NODE_ENV: process.env.NODE_ENV,
};

function ensureAllVariablesAreSet() {
  Object.entries(environment).forEach(([key, value]) => {
    ensureVariableIsSet(value, key);
  });
}

ensureAllVariablesAreSet();
