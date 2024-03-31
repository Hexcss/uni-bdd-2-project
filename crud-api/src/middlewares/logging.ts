import morgan from 'morgan';
import winston, { Logger, transports } from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
    winston.format.printf(
      (info: winston.Logform.TransformableInfo) =>
        `${info.timestamp} [${info.level}]: ${info.message} ${info.httpMethod ? info.httpMethod : ''} ${info.url ? info.url : ''} `
    )
  ),
  transports: [
    new winston.transports.File({ filename: 'combined.log', level: 'info' }),
    new winston.transports.File({ filename: 'errors.log', level: 'error' }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.printf(
          (info: winston.Logform.TransformableInfo) =>
            `${info.timestamp} [${info.level}]: ${info.message} ${info.httpMethod ? info.httpMethod : ''} ${info.url ? info.url : ''} `
        )
      ),
    }),
  ],
});

const morganMiddleware = morgan(
  function (tokens: any, req: any, res: any) {
    return [
      tokens.date(req, res, 'iso'),
      `[${tokens.method(req, res)}]:`,
      tokens.url(req, res),
      `Status: ${tokens.status(req, res)}`,
      `${tokens['response-time'](req, res)}ms`,
    ].join(' ');
  },
  { stream: { write: (message: string) => logger.info(message.trim()) } }
);

const logginMiddleware = { logger, morganMiddleware };

export default logginMiddleware;
