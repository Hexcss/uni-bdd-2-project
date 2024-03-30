import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errorHandler, limiter, loggingMiddleware } from './middlewares';
import routes from './routes/index';

const app: Express = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(limiter);
app.use(loggingMiddleware.morganMiddleware);

app.use('/api', routes, errorHandler);

export default app;
