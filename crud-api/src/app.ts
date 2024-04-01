import express, { Express } from 'express';
import helmet from 'helmet';
import { corsMiddleware, loggingMiddleware } from './middlewares';
import { connectDatabase } from './services';
import limiter from './middlewares/limiter';
import configureRoutes from './routes';

const app: Express = express();

connectDatabase().then(() => {
  app.use(corsMiddleware);
  app.use(helmet());
  app.use(express.json());
  app.use(limiter);
  app.use(loggingMiddleware.morganMiddleware);

  configureRoutes(app);
});

export default app;
