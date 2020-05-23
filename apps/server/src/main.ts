/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import express from 'express';
import userRouter from './app/routers/user';
import './app/db/mongoose';
import { logger } from './app/utils/logger';

const app = express();

app.use(express.json());
app.use(userRouter);

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to server!' });
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  logger(`Listening at http://localhost:${port}/api`);
});
server.on('error', (e) => logger(e));
