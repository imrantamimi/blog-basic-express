import { body } from 'express-validator';

export const updateTagValidator = [body('name').notEmpty().withMessage('Name is required')];
