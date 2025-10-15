import express from 'express';
import adminRouter from './admin/index.js';
import clientRouter from './client/index.js';

const api = express.Router();

api.use('/admin', adminRouter);
api.use('/client', clientRouter);

export default api;
