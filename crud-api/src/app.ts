import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';

const app: Express = express();

app.use(cors());
app.use(helmet());

app.get('/example', (req: Request, res: Response) => {
  res.json({ message: 'This is an example route!' });
});

export default app;
