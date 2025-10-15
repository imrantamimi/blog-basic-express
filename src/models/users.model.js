import { userDatabase } from './users.mongo.js';

// CREATE a new user
export async function createUser(data) {
  const user = new userDatabase(data);
  return await user.save();
}

// READ all users
export async function getAllUsers(skip, limit) {
  return await userDatabase
    .find()
    .sort({
      createdAt: 1,
    })
    .skip(skip)
    .limit(limit);
}

// READ one user by ID
export async function getUserById(id) {
  return await userDatabase.findById(id);
}

// UPDATE a user by ID
export async function updateUser(data, id) {
  return await userDatabase.findByIdAndUpdate(id, data, {
    new: true,
  });
}

// DELETE a user by ID
export async function deleteUser(id) {
  return await userDatabase.findByIdAndDelete(id);
}

//Get user by email
export async function getUserByEmail(email) {
  return await userDatabase.findOne({ email });
}
