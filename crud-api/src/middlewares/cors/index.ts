import cors, { CorsOptions, CorsRequest } from 'cors';
import loggingMiddleware from '../logger/index';

const allowedOrigins: string[] =
  process.env.ALLOWED_ORIGINS?.split(',').filter(
    (origin) => origin.trim() !== ''
  ) || [];

type CorsOptionsCallback = (err: Error | null, options?: CorsOptions) => void;

const corsOptionsDelegate = (
  req: CorsRequest,
  callback: CorsOptionsCallback
): void => {
  let corsOptions: CorsOptions;

  if (process.env.NODE_ENV === 'development') {
    corsOptions = { origin: true };
  } else {
    const requestOrigin = req.headers.origin;
    const isOriginAllowed =
      requestOrigin && allowedOrigins.includes(requestOrigin);

    if (!isOriginAllowed && requestOrigin) {
      loggingMiddleware.logger.warn(
        `Unauthorized CORS attempt from: ${requestOrigin}`
      );
    }

    corsOptions = { origin: isOriginAllowed };
  }

  callback(null, corsOptions);
};

const customCorsMiddleware = cors(corsOptionsDelegate);

export default customCorsMiddleware;
