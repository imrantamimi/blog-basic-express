import { body } from 'express-validator';

export const createCategoryValidator = [body('name').notEmpty().withMessage('Name is required'), body('slug').notEmpty().withMessage('Slug is required'), body('description').notEmpty().withMessage('Description is required')];
