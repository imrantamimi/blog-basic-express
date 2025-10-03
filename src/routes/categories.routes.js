const express = require('express');
const { httpGetAllCategories, httpGetCategoryById, httpCreateCategory, httpUpdateCategory, httpDeleteCategory } = require('../controllers/categories.controller');

const categoriesRouter = express.Router();

categoriesRouter.get('/', httpGetAllCategories);
categoriesRouter.get('/:id', httpGetCategoryById);
categoriesRouter.post('/', httpCreateCategory);
categoriesRouter.put('/:id', httpUpdateCategory);
categoriesRouter.delete('/:id', httpDeleteCategory);

module.exports = categoriesRouter;
