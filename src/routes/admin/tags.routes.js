import express from 'express';
import { httpGetAllTags, httpCreateTag, httpDeleteTag, httpGetTagById, httpUpdateTag } from '../../controllers/tags.controller.js';
import { protect } from '../../middleware/auth.middleware.js';
import { createTagValidator } from '../../validators/tags/createTag.validator.js';
import { updateTagValidator } from '../../validators/tags/updateTag.validator.js';
import { validate } from '../../middleware/validate.middleware.js';
import { validateObjectId } from '../../middleware/validateObjectId.middleware.js';

const tagsRouter = express.Router();

tagsRouter.get('/', protect, httpGetAllTags);
tagsRouter.get('/:id', protect, validateObjectId, httpGetTagById);
tagsRouter.post('/', protect, createTagValidator, validate, httpCreateTag);
tagsRouter.put('/:id', protect, validateObjectId, updateTagValidator, validate, httpUpdateTag);
tagsRouter.delete('/:id', protect, validateObjectId, httpDeleteTag);

export default tagsRouter;
