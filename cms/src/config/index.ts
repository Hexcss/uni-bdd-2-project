import { ensureVariableIsSet } from '../utils/functions';
import { Environment } from '../utils/interfaces';

export const environment: Environment = {
  AUTH_API_URL: import.meta.env.VITE_AUTH_API_URL,
  CRUD_API_URL: import.meta.env.VITE_CRUD_API_URL,
};

function ensureAllVariablesAreSet() {
  Object.entries(environment).forEach(([key, value]) => {
    ensureVariableIsSet(value, key);
  });
}

ensureAllVariablesAreSet();
