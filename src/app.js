import path from 'path';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { fileURLToPath } from 'url';

import { api } from './routes/api.js';

// __dirname is not available in ES modules, so we recreate it:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

app.use(morgan('combined'));

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, '../uploads/public')));

app.use('/v1', api);

export { app };
