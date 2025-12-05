import express from 'express';
import { httpGetAllUsers, httpCreateUser, httpDeleteUser, httpGetUserById, httpLoginUser, httpUpdateUser } from '../../controllers/users.controller.js';
import { registerUserValidator } from '../../validators/users/createUser.validator.js';
import { validate } from '../../middleware/validate.middleware.js';
import { loginUserValidator } from '../../validators/users/loginUser.validator.js';
import { updateUserValidator } from '../../validators/users/updateUser.validator.js';

const publicUsersRouter = express.Router();
publicUsersRouter.post('/login', loginUserValidator, validate, httpLoginUser);
publicUsersRouter.post('/', registerUserValidator, validate, httpCreateUser);

const privateUsersRouter = express.Router();
privateUsersRouter.get('/', httpGetAllUsers);
privateUsersRouter.get('/:id', httpGetUserById);
privateUsersRouter.put('/:id', updateUserValidator, validate, httpUpdateUser);
privateUsersRouter.delete('/:id', httpDeleteUser);

export default {
  publicUsersRouter,
  privateUsersRouter,
};
