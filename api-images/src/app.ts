import express, { Express } from 'express';
import helmet from 'helmet';
import { connectDatabase } from './services';
import limiter from './middlewares/limiter';
import configureRoutes from './routes';
import {
  authMiddleware,
  corsMiddleware,
  loggingMiddleware,
} from './middlewares';

const app: Express = express();

connectDatabase().then(() => {
  app.set('trust proxy', 1);
  app.use(corsMiddleware);
  app.use(helmet());
  app.use(express.json());
  app.use(loggingMiddleware.morganMiddleware);
  app.use(limiter);
  app.use(authMiddleware);

  configureRoutes(app);
});

export default app;
