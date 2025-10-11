import { postDatabase } from './posts.mongo.js';

// Create a Post function
export async function createPost(data, image) {
  const post = new postDatabase({ ...data, image });
  return await post.save();
}

// Read all posts function
export async function getAllPosts(skip, limit) {
  return await postDatabase
    .find()
    .sort({
      createdAt: 1,
    })
    .skip(skip)
    .limit(limit)
    .populate('createdBy')
    .populate('category');
}

// Read post by ID
export async function getPostById(id) {
  return await postDatabase.findById(id).populate('createdBy').populate('category');
}
// Update post by ID
export async function updatePost(id, data, image) {
  const post = postDatabase.findById(id);
  if (!post) {
    return res.status(404).json({
      message: 'Post not found',
    });
  }
  if (image) {
    if (post.image) {
      const oldImagePath = path.resolve(post.image);
      fs.unlink(oldImagePath, (err) => {
        if (err) {
          console.log('Failed to delete image', err);
        } else {
          console.log('Old image deleted:', oldImagePath);
        }
      });
    }
    // post.image = image;
  }
  return await postDatabase
    .findByIdAndUpdate(
      id,
      { ...data, image },
      {
        new: true,
      }
    )
    .populate('createdBy')
    .populate('category');
}

//Delete post by ID
export async function deletePost(id) {
  const fs = require('fs');
  const post = postDatabase.findById(id);
  if (post.image) {
    const imagePath = path.resolve(post.image); // ensure absolute path * check this part in postman
    fs.unlink(`uploads/${post.image}`, (err) => {
      if (err) {
        console.error('Error deleting old image:', err);
      }
    });
  }
  return await postDatabase.findByIdAndDelete(id);
}
