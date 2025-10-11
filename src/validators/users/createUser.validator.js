import { body } from 'express-validator';
import { isUniqueEmail } from '../helpers/isUniqueEmail.js';

export const registerUserValidator = [
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required')
    .isLength({
      min: 2,
    })
    .withMessage('First name must be atleast 2 characters long'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Please provide a valid email').custom(isUniqueEmail),
  body('password')
    .isLength({
      min: 6,
    })
    .withMessage('Password must be atleast 6 characters'),
];
