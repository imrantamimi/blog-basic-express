import { createPost, getAllPosts, getPostById, updatePost, deletePost } from '../models/posts.model.js';
import { getPagination } from '../utils/query.js';

export async function httpCreatePost(req, res) {
  const data = req.body;
  data.createdBy = req.user.id;
  const image = req.file ? req.file.filename : null;
  const post = await createPost(data, image);
  return res.status(200).json(post);
}

export async function httpGetAllPosts(req, res) {
  const { skip, limit } = getPagination(req.query);
  const posts = await getAllPosts(skip, limit);
  return res.status(200).json(posts);
}

export async function httpGetPostById(req, res) {
  const postId = req.params.id;
  const post = await getPostById(postId);
  if (post && post.image && post.image.url) {
    const baseUrl = `${req.protocol}://${req.get('host')}/uploads/public/`;
    post.image.url = baseUrl + post.image.url;
  }
  return res.status(200).json(post);
}

export async function httpUpdatePost(req, res) {
  const postId = req.params.id;
  const data = req.body;
  const image = req.file ? req.file.filename : null;
  const post = await updatePost(postId, data, image);
  return res.status(200).json(post);
}

export async function httpDeletePost(req, res) {
  const postId = req.params.id;
  await deletePost(postId);
  return res.status(200).json({
    ok: true,
  });
}
