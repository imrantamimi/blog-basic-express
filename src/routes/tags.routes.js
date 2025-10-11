import express from 'express';
import { httpGetAllTags, httpCreateTag, httpDeleteTag, httpGetTagById, httpUpdateTag } from '../controllers/tags.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { createTagValidator } from '../validators/tags/createTag.validator.js';
import { updateTagValidator } from '../validators/tags/updateTag.validator.js';
import { validate } from '../middleware/validate.middleware.js';

const tagsRouter = express.Router();

tagsRouter.get('/', httpGetAllTags);
tagsRouter.get('/:id', httpGetTagById);
tagsRouter.post('/', protect, createTagValidator, validate, httpCreateTag);
tagsRouter.put('/:id', protect, updateTagValidator, validate, httpUpdateTag);
tagsRouter.delete('/:id', protect, httpDeleteTag);

export { tagsRouter };
