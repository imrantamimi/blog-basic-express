import express from 'express';

import { usersRouter } from './users.routes.js';
import { tagsRouter } from './tags.routes.js';
import { categoriesRouter } from './categories.routes.js';
import { postsRouter } from './posts.routes.js';

const api = express.Router();

api.use('/users', usersRouter);
api.use('/tags', tagsRouter);
api.use('/categories', categoriesRouter);
api.use('/posts', postsRouter);

export { api };
