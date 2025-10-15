import express from 'express';
import { httpGetAllUsers, httpCreateUser, httpDeleteUser, httpGetUserById, httpLoginUser, httpUpdateUser } from '../../controllers/users.controller.js';
import { protect } from '../../middleware/auth.middleware.js';
import { registerUserValidator } from '../../validators/users/createUser.validator.js';
import { validate } from '../../middleware/validate.middleware.js';
import { loginUserValidator } from '../../validators/users/loginUser.validator.js';
import { updateUserValidator } from '../../validators/users/updateUser.validator.js';

const usersRouter = express.Router();

usersRouter.post('/', registerUserValidator, validate, httpCreateUser);
usersRouter.post('/login', loginUserValidator, validate, httpLoginUser);
usersRouter.get('/', protect, httpGetAllUsers);
usersRouter.get('/:id', protect, httpGetUserById);
usersRouter.put('/:id', protect, updateUserValidator, validate, httpUpdateUser);
usersRouter.delete('/:id', protect, httpDeleteUser);

export default usersRouter;
