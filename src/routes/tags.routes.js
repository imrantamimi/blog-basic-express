import express from 'express';
import { httpGetAllTags, httpCreateTag, httpDeleteTag, httpGetTagById, httpUpdateTag } from '../controllers/tags.controller.js';

const tagsRouter = express.Router();

tagsRouter.get('/', httpGetAllTags);
tagsRouter.get('/:id', httpGetTagById);
tagsRouter.post('/', httpCreateTag);
tagsRouter.put('/:id', httpUpdateTag);
tagsRouter.delete('/:id', httpDeleteTag);

export { tagsRouter };
