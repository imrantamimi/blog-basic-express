import express from 'express';
import { httpCreateCategory, httpDeleteCategory, httpGetAllCategories, httpGetCategoryById, httpUpdateCategory } from '../../controllers/categories.controller.js';
import { createCategoryValidator } from '../../validators/categories/createCategory.validator.js';
import { validate } from '../../middleware/validate.middleware.js';
import { protect } from '../../middleware/auth.middleware.js';
import { updateCategoryValidator } from '../../validators/categories/updateCategory.validator.js';
import { validateObjectId } from '../../middleware/validateObjectId.middleware.js';

const categoriesRouter = express.Router();

categoriesRouter.get('/', httpGetAllCategories);
categoriesRouter.get('/:id', validateObjectId, httpGetCategoryById);
categoriesRouter.post('/', protect, createCategoryValidator, validate, httpCreateCategory);
categoriesRouter.put('/:id', protect, validateObjectId, updateCategoryValidator, validate, httpUpdateCategory);
categoriesRouter.delete('/:id', protect, validateObjectId, httpDeleteCategory);

export default categoriesRouter;
