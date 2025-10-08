const express = require('express');
const { httpGetAllUsers, httpGetUserById, httpCreateUser, httpUpdateUser, httpDeleteUser, httpLoginUser } = require('../controllers/users.controller');
const protect = require('../middleware/auth.middleware');

const usersRouter = express.Router();

usersRouter.post('/', httpCreateUser);
usersRouter.post('/login', httpLoginUser);
usersRouter.get('/', protect, httpGetAllUsers);
usersRouter.get('/:id', protect, httpGetUserById);
usersRouter.put('/:id', protect, httpUpdateUser);
usersRouter.delete('/:id', protect, httpDeleteUser);

module.exports = usersRouter;
