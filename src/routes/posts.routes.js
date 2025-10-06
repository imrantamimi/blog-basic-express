const express = require("express");
const { httpGetAllPosts, httpGetPostById, httpCreatePost, httpUpdatePost, httpDeletePost } = require("../controllers/posts.controller");

const postsRouter = express.Router();

postsRouter.get("/", httpGetAllPosts);
postsRouter.get("/:id", httpGetPostById);
postsRouter.post("/", httpCreatePost);
postsRouter.put("/:id", httpUpdatePost);
postsRouter.delete("/:id", httpDeletePost);

module.exports = postsRouter;
