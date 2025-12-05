import express from 'express';

import usersRouter from './users.routes.js';
import tagsRouter from './tags.routes.js';
import categoriesRouter from './categories.routes.js';
import postsRouter from './posts.routes.js';
import { protect, restrictTo } from '../../middleware/auth.middleware.js';

const adminRouter = express.Router();

adminRouter.use('/users', usersRouter.publicUsersRouter);

adminRouter.use(protect);
adminRouter.use(restrictTo('admin'));
adminRouter.use('/users', usersRouter.privateUsersRouter);
adminRouter.use('/tags', tagsRouter);
adminRouter.use('/categories', categoriesRouter);
adminRouter.use('/posts', postsRouter);

export default adminRouter;
