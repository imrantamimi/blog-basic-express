const express = require('express');

const usersRouter = require('./users.routes');
const tagsRouter = require('./tags.routes');
const categoriesRouter = require('./categories.routes');

const api = express.Router();

api.use('/users', usersRouter);
api.use('/tags', tagsRouter);
api.use('/categories', categoriesRouter);

module.exports = api;
