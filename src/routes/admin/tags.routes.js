import express from 'express';
import { httpGetAllTags, httpCreateTag, httpDeleteTag, httpGetTagById, httpUpdateTag } from '../../controllers/tags.controller.js';
import { createTagValidator } from '../../validators/tags/createTag.validator.js';
import { updateTagValidator } from '../../validators/tags/updateTag.validator.js';
import { validate } from '../../middleware/validate.middleware.js';
import { validateObjectId } from '../../middleware/validateObjectId.middleware.js';

const tagsRouter = express.Router();

tagsRouter.get('/', httpGetAllTags);
tagsRouter.get('/:id', validateObjectId, httpGetTagById);
tagsRouter.post('/', createTagValidator, validate, httpCreateTag);
tagsRouter.put('/:id', validateObjectId, updateTagValidator, validate, httpUpdateTag);
tagsRouter.delete('/:id', validateObjectId, httpDeleteTag);

export default tagsRouter;
