import express, { Express } from 'express';
import helmet from 'helmet';
import { errorHandler, limiter, loggingMiddleware } from './middlewares';
import routes from './routes/index';
import { connectDatabase } from './services/mongo';
import cors from 'cors';

const app: Express = express();

connectDatabase().then(() => {
  app.set('trust proxy', 1);
  app.use(cors());
  app.use(helmet());
  app.use(express.json());
  app.use(limiter);
  app.use(loggingMiddleware.morganMiddleware);

  app.use('/api', routes, errorHandler);
});

export default app;
