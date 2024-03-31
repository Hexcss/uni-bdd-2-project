import { format } from 'winston';
import { CustomError, ExtendedLogInfo } from '../interfaces';

export function ensureVariableIsSet(
  variable: string | undefined,
  name: string
): asserts variable is string {
  if (!variable) {
    throw new Error(`Environment variable ${name} is not set.`);
  }
}

export function parsePort(port: string | undefined): number {
  const parsedPort = parseInt(port ?? '8080', 10);
  if (isNaN(parsedPort)) {
    throw new Error(`Invalid port number: ${port}`);
  }
  return parsedPort;
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

export const formatLogger = format.printf((info: ExtendedLogInfo) => {
  return `${info.timestamp} [${info.level}]: ${info.message} ${info.httpMethod ?? ''} ${info.url ?? ''}`;
});
