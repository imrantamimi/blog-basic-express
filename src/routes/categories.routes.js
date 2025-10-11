import express from 'express';
import { httpCreateCategory, httpDeleteCategory, httpGetAllCategories, httpGetCategoryById, httpUpdateCategory } from '../controllers/categories.controller.js';

const categoriesRouter = express.Router();

categoriesRouter.get('/', httpGetAllCategories);
categoriesRouter.get('/:id', httpGetCategoryById);
categoriesRouter.post('/', httpCreateCategory);
categoriesRouter.put('/:id', httpUpdateCategory);
categoriesRouter.delete('/:id', httpDeleteCategory);

export { categoriesRouter };
