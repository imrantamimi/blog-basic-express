import express from 'express';
import { httpGetAllPosts, httpGetPostById, httpCreatePost, httpDeletePost, httpUpdatePost } from '../../controllers/posts.controller.js';
import { upload } from '../../middleware/upload.middleware.js';
import { createPostValidator } from '../../validators/posts/createPost.validator.js';
import { validate } from '../../middleware/validate.middleware.js';
import { updatePostValidator } from '../../validators/posts/updatePost.validator.js';
import { validateObjectId } from '../../middleware/validateObjectId.middleware.js';

const postsRouter = express.Router();

postsRouter.get('/', httpGetAllPosts);
postsRouter.get('/:id', validateObjectId, httpGetPostById);
postsRouter.post('/', upload.single('image'), createPostValidator, validate, httpCreatePost);
postsRouter.put('/:id', validateObjectId, upload.single('image'), updatePostValidator, validate, httpUpdatePost);
postsRouter.delete('/:id', validateObjectId, httpDeletePost);

export default postsRouter;
