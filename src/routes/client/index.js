import express from 'express';
import usersRouter from './users.route.js';
import postRouter from './posts.route.js';

const clientRoutes = express.Router();

clientRoutes.use('/users', usersRouter);
clientRoutes.use('/posts', postRouter);

export default clientRoutes;
