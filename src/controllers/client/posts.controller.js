import { createPost, deletePost, getAllPosts, getPostById, getPostBySlug } from '../../models/posts.model.js';
import { getPagination } from '../../utils/query.js';

export async function httpGetAllPosts(req, res) {
  const { skip, limit } = getPagination(req.query);
  const posts = await getAllPosts(skip, limit);
  return res.status(200).json(posts);
}

export async function httpGetPostBySlug(req, res) {
  try {
    const postSlug = req.params.slug;
    const post = await getPostBySlug(postSlug);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'An unexpected error occured',
    });
  }
}

export async function httpCreatePost(req, res) {
  const data = req.body;
  data.createdBy = req.user.id;
  const post = await createPost(data);
  return res.status(200).json(post);
}

export async function httpEditPost(req, res) {
  const postId = req.params.id;
  const post = await getPostById(postId);
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  if (post.createdBy.toString() !== req.user.id) {
    return res.status(401).json({
      error: 'Unauthorized',
    });
  }
  return res.status(200).json(post);
}

export async function httpUpdatePost(req, res) {
  const postId = req.params.id;
  const data = req.body;
  const post = await getPostById(postId);
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  if (post.createdBy.toString() !== req.user.id) {
    return res.status(401).json({
      error: 'Unauthorized',
    });
  }
  Object.assign(post, data);
  await post.save();
  return res.status(200).json(post);
}

export async function httpDeletePost(req, res) {
  const postId = req.params.id;
  const post = await getPostById(postId);
  if (!post) {
    return res.status(404).json({
      error: 'Post not found',
    });
  }
  if (post.createdBy.toString() !== req.user.id) {
    return res.status(401).json({
      error: 'Unauthorized',
    });
  }
  await deletePost(postId);
  return res.status(201).json({
    ok: true,
  });
}
