import express, { Express } from 'express';
import helmet from 'helmet';
import { errorHandler, limiter, loggingMiddleware } from './middlewares';
import routes from './routes/index';
import { connectDatabase } from './services/mongo';
import cors from 'cors';

const app: Express = express();

connectDatabase().then(() => {
  app.set('trust proxy', 1);
  app.options('*', cors());
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    })
  );
  app.use(express.json());
  app.use(loggingMiddleware.morganMiddleware);
  app.use(limiter);
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.header(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS'
    );
    next();
  });
  app.use(loggingMiddleware.morganMiddleware);

  app.use('/api', routes, errorHandler);
});

export default app;
