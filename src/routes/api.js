const express = require("express");

const usersRouter = require("./users.routes");
const tagsRouter = require("./tags.routes");
const categoriesRouter = require("./categories.routes");
const postsRouter = require("./posts.routes");

const api = express.Router();

api.use("/users", usersRouter);
api.use("/tags", tagsRouter);
api.use("/categories", categoriesRouter);
api.use("/posts", postsRouter);

module.exports = api;
