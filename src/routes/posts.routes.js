import express from 'express';
import { httpGetAllPosts, httpGetPostById, httpCreatePost, httpDeletePost, httpUpdatePost } from '../controllers/posts.controller.js';
import { upload } from '../middleware/upload.middleware.js';

const postsRouter = express.Router();

postsRouter.get('/', httpGetAllPosts);
postsRouter.get('/:id', httpGetPostById);
postsRouter.post('/', upload.single('image'), httpCreatePost);
postsRouter.put('/:id', upload.single('image'), httpUpdatePost);
postsRouter.delete('/:id', httpDeletePost);

export { postsRouter };
