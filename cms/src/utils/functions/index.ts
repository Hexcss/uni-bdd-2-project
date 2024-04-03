import CryptoJS from 'crypto-js';
import { environment } from '../../config/index';

export function ensureVariableIsSet(
  variable: string | undefined,
  name: string
): asserts variable is string {
  if (!variable) {
    throw new Error(`Environment variable ${name} is not set.`);
  }
}

export function encryptToken(token: string): string {
  return CryptoJS.AES.encrypt(token, environment.SECRET_KEY as string).toString();
}

export function decryptToken(encryptedToken: string): string {
  const bytes = CryptoJS.AES.decrypt(encryptedToken, environment.SECRET_KEY as string);
  return bytes.toString(CryptoJS.enc.Utf8);
}

export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
