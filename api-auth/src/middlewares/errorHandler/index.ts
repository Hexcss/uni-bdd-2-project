import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import loggingMiddleware from '../logger';
import { getErrorStatusCodeAndMessage } from '../../utils/functions';

const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { statusCode, message } = getErrorStatusCodeAndMessage(err);

  loggingMiddleware.logger.error(
    `${statusCode} - ${message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
    err.stack
  );

  if (!res.headersSent) {
    res.status(statusCode).json({
      status: 'error',
      statusCode,
      message,
    });
  } else {
    next(err);
  }
};

export default errorHandler;
