const axios = require("axios");

const usersDatabase = require("./users.mongo");

// CREATE a new user
async function createUser(data) {
  const user = new usersDatabase(data);
  return await user.save();
}

// READ all users
async function getAllUsers(skip, limit) {
  return await usersDatabase
    .find()
    .sort({
      createdAt: 1,
    })
    .skip(skip)
    .limit(limit);
}

// READ one user by ID
async function getUserById(id) {
  return await usersDatabase.findById(id);
}

// UPDATE a user by ID
async function updateUser(data, id) {
  return await usersDatabase.findByIdAndUpdate(id, data);
}

// DELETE a user by ID
async function deleteUser(id) {
  return await usersDatabase.findByIdAndDelete(id);
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
