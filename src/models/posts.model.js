const postsDatabase = require("./posts.mongo");

// Create a Post function
async function createPost(data) {
  const post = new postsDatabase(data);
  return await post.save();
}

// Read all posts function
async function getAllPosts(skip, limit) {
  return await postsDatabase
    .find()
    .sort({
      createdAt: 1,
    })
    .skip(skip)
    .limit(limit)
    .populate("createdBy")
    .populate("category");
}

// Read post by ID
async function getPostById(id) {
  return await postsDatabase.findById(id).populate("createdBy").populate("category");
}
// Update post by ID
async function updatePost(id, data) {
  return await postsDatabase.findByIdAndUpdate(id, data).populate("createdBy").populate("category");
}

//Delete post by ID
async function deletePost(id) {
  return await postsDatabase.findByIdAndDelete(id);
}

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
