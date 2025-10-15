import express from 'express';
import { httpCreatePost, httpDeletePost, httpEditPost, httpGetAllPosts, httpGetPostBySlug, httpUpdatePost } from '../../controllers/client/posts.controller.js';

const postRouter = express.Router();

postRouter.get('/', httpGetAllPosts);
postRouter.get('/:slug', httpGetPostBySlug);
postRouter.post('/', httpCreatePost);
postRouter.get('/:id/edit', httpEditPost);
postRouter.put('/:id', httpUpdatePost);
postRouter.delete('/:id', httpDeletePost);

export default postRouter;
