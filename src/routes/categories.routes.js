import express from 'express';
import { httpCreateCategory, httpDeleteCategory, httpGetAllCategories, httpGetCategoryById, httpUpdateCategory } from '../controllers/categories.controller.js';
import { createCategoryValidator } from '../validators/categories/createCategory.validator.js';
import { validate } from '../middleware/validate.middleware.js';
import { protect } from '../middleware/auth.middleware.js';
import { updateCategoryValidator } from '../validators/categories/updateCategory.validator.js';

const categoriesRouter = express.Router();

categoriesRouter.get('/', httpGetAllCategories);
categoriesRouter.get('/:id', httpGetCategoryById);
categoriesRouter.post('/', protect, createCategoryValidator, validate, httpCreateCategory);
categoriesRouter.put('/:id', protect, updateCategoryValidator, validate, httpUpdateCategory);
categoriesRouter.delete('/:id', protect, httpDeleteCategory);

export { categoriesRouter };
