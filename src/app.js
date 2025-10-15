import path from 'path';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { globalErrorHandler } from './middleware/errorHandler.js';
import AppError from './utils/AppError.js';

//Routes
import api from './routes/api.js';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

app.use(morgan('combined'));

app.use(express.json());

app.use('/uploads/public', express.static(path.resolve('uploads', 'public')));

app.use('/v1', api);

app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

export default app;
