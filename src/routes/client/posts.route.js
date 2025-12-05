import express from 'express';
import { httpCreatePost, httpDeletePost, httpEditPost, httpGetAllPosts, httpGetPostBySlug, httpUpdatePost } from '../../controllers/client/posts.controller.js';
import { protect, restrictTo } from '../../middleware/auth.middleware.js';

const postRouter = express.Router();

postRouter.get('/', httpGetAllPosts);
postRouter.get('/:slug', httpGetPostBySlug);
postRouter.post('/', protect, restrictTo('user'), httpCreatePost);
postRouter.get('/:id/edit', protect, restrictTo('user'), httpEditPost);
postRouter.put('/:id', protect, restrictTo('user'), httpUpdatePost);
postRouter.delete('/:id', protect, restrictTo('user'), httpDeletePost);

export default postRouter;
