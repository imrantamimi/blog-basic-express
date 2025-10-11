import { body } from 'express-validator';

export const createTagValidator = [body('name').notEmpty().withMessage('Name is required')];
