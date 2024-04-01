import morgan from 'morgan';
import winston, { format, transports } from 'winston';
import { formatLogger } from '../../utils/functions';

const logger = winston.createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
    formatLogger
  ),
  transports: [
    new transports.File({ filename: 'logs/combined.log', level: 'info' }),
    new transports.File({ filename: 'logs/errors.log', level: 'error' }),
    new transports.Console({
      format: format.combine(format.colorize({ all: true }), formatLogger),
    }),
  ],
});

const morganMiddleware = morgan(
  (tokens, req, res) => {
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
const loggingMiddleware = { logger, morganMiddleware };
export default loggingMiddleware;
