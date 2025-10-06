const { createPost, getAllPosts, getPostById, updatePost, deletePost } = require("../models/posts.model");
const { getPagination } = require("../utils/query");

async function httpCreatePost(req, res) {
  const data = req.body;
  const post = await createPost(data);
  return res.status(200).json(post);
}

async function httpGetAllPosts(req, res) {
  const { skip, limit } = getPagination(req.query);
  const posts = await getAllPosts(skip, limit);
  return res.status(200).json(posts);
}

async function httpGetPostById(req, res) {
  const postId = req.params.id;
  const post = await getPostById(postId);
  return res.status(200).json(post);
}

async function httpUpdatePost(req, res) {
  const postId = req.params.id;
  const data = req.body;
  const post = await updatePost(postId, data);
  return res.status(200).json(post);
}

async function httpDeletePost(req, res) {
  const postId = req.params.id;
  await deletePost(postId);
  return res.status(200).json({
    ok: true,
  });
}

module.exports = {
  httpCreatePost,
  httpGetAllPosts,
  httpGetPostById,
  httpUpdatePost,
  httpDeletePost,
};
