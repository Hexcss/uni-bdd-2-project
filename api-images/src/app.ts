import express, { Express } from 'express';
import helmet from 'helmet';
import { connectDatabase } from './services';
import limiter from './middlewares/limiter';
import configureRoutes from './routes';
import { loggingMiddleware } from './middlewares';
import serverImagesRoutes from './routes/server';
import cors from 'cors';

const app: Express = express();

connectDatabase().then(() => {
  app.set('trust proxy', 1);
  app.use(cors());
  app.use(helmet());
  app.use(express.json());
  app.use(loggingMiddleware.morganMiddleware);
  app.use(limiter);
  app.use('/api/server', serverImagesRoutes);

  configureRoutes(app);
});

export default app;
