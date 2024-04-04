import rateLimit from 'express-rate-limit';
import { Options } from 'express-rate-limit';

const limiterOptions: Partial<Options> = {
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again after 15 minutes',
  statusCode: 429,
};

const limiter = rateLimit(limiterOptions);

export default limiter;
