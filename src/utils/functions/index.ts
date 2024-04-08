import { format } from 'winston';
import { CustomError, ExtendedLogInfo } from '../interfaces';
import { ValidationError } from 'joi';
export function ensureVariableIsSet(
  variable: string | undefined,
  name: string
): asserts variable is string {
  if (!variable) {
    throw new Error(`Environment variable ${name} is not set.`);
  }
}

export function parseNumber(
  number: string | number | undefined,
  defaultValue: string
): number {
  if (typeof number === 'number') {
    return number;
  }
  const parsedNumber = parseInt(number ?? defaultValue, 10);
  if (isNaN(parsedNumber)) {
    throw new Error(`Invalid number: ${number}`);
  }
  return parsedNumber;
}

export function checkIfIsCustomError(error): error is CustomError {
  return 'statusCode' in error && 'message' in error;
}

export function getErrorStatusCodeAndMessage(err: Error) {
  let statusCode = 500;
  let message = 'An internal server error occurred';

  if (checkIfIsCustomError(err)) {
    statusCode = err.statusCode || statusCode;
    message = err.message || message;
  }

  return { statusCode, message };
}

export function getValidationErrorMessages(error: ValidationError): string {
  return error.details.map((detail) => detail.message).join(', ');
}

export const formatLogger = format.printf((info: ExtendedLogInfo) => {
  return `${info.timestamp} [${info.level}]: ${info.message} ${info.httpMethod ?? ''} ${info.url ?? ''}`;
});
