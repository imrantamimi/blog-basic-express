import fs from 'fs';
import path from 'path';
import { postDatabase } from './posts.mongo.js';
import AppError from '../utils/AppError.js';

// Create a Post function
export async function createPost(data, image) {
  const post = new postDatabase({
    ...data,
    image: image
      ? {
          url: image,
        }
      : undefined,
  });
  return await post.save();
}

// Read all posts function
export async function getAllPosts(skip, limit) {
  return await postDatabase
    .find()
    .sort({
      createdAt: -1, //latest first
    })
    .skip(skip)
    .limit(limit)
    .populate('createdBy')
    // .populate({
    //   path: 'category',
    //   populate: {
    //     path: 'createdBy',
    //   },
    // });
    .populate('category');
}

// Read post by ID
export async function getPostById(id) {
  return await postDatabase.findById(id).populate('createdBy').populate('category');
}

//Read post by Slug
export async function getPostBySlug(slug) {
  const post = await postDatabase.findOne({ slug }).populate('createdBy').populate('category');
  if (!post) {
    throw new AppError('Post not found', 404);
  }
  return post;
}

// Update post by ID
export async function updatePost(id, data, image) {
  const post = await postDatabase.findById(id);
  if (!post) {
    return res.status(404).json({
      message: 'Post not found',
    });
  }
  if (image && post.image && post.image.url) {
    const oldImagePath = path.resolve('uploads', 'public', post.image.url);
    fs.unlink(oldImagePath, (err) => {
      if (err) {
        console.log('Failed to delete image', err);
      } else {
        console.log('Old image deleted:', oldImagePath);
      }
    });
    // post.image = image;
  }
  return await postDatabase
    .findByIdAndUpdate(
      id,
      {
        ...data,
        image: image
          ? {
              url: image,
            }
          : undefined,
      },
      {
        new: true,
      }
    )
    .populate('createdBy')
    .populate('category');
}

//Delete post by ID
export async function deletePost(id) {
  const post = await postDatabase.findById(id);
  if (post && post.image && post.image.url) {
    const imagePath = path.resolve('uploads', 'public', post.image.url); // ensure absolute path * check this part in postman
    if (fs.existsSync(imagePath)) {
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error('Error deleting old image:', err);
        }
      });
    } else {
      console.log(`File not found: ${imagePath}`);
    }
  }
  return await postDatabase.findByIdAndDelete(id);
}
