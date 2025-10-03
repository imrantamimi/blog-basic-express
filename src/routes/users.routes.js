const express = require('express');
const { httpGetAllUsers, httpGetUserById, httpCreateUser, httpUpdateUser, httpDeleteUser } = require('../controllers/users.controller');

const usersRouter = express.Router();

usersRouter.get('/', httpGetAllUsers);
usersRouter.get('/:id', httpGetUserById);
usersRouter.post('/', httpCreateUser);
usersRouter.put('/:id', httpUpdateUser);
usersRouter.delete('/:id', httpDeleteUser);

module.exports = usersRouter;
