const jwt = require('jsonwebtoken');

const { getAllUsers, createUser, getUserById, updateUser, deleteUser, getUserByEmail } = require('../models/users.model');
const { getPagination } = require('../utils/query');

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

async function httpGetAllUsers(req, res) {
  const { skip, limit } = getPagination(req.query);
  const users = await getAllUsers(skip, limit);
  return res.status(200).json(users);
}

async function httpCreateUser(req, res) {
  try {
    const data = req.body;
    const user = await createUser(data);
    return res.status(200).json(user);
  } catch (err) {
    throw new Error(err);
  }
}

async function httpGetUserById(req, res) {
  const userId = req.params.id;
  const user = await getUserById(userId);
  return res.status(200).json(user);
}

async function httpUpdateUser(req, res) {
  const userId = req.params.id;
  const user = req.body;
  await updateUser(user, userId);
  return res.status(200).json(user);
}

async function httpDeleteUser(req, res) {
  const userId = req.params.id;
  await deleteUser(userId);
  return res.status(201).json({
    ok: true,
  });
}

async function httpLoginUser(req, res) {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);
  if (!user) {
    return res.status(404).json({
      error: 'User not found',
    });
  }
  const isMatch = await user.comparePassword(password); // Compare password
  if (!isMatch) {
    return res.status(401).json({
      error: 'Invalid password',
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    JWT_SECRET,
    {
      expiresIn: '1d',
    }
  );

  res.json({
    token: token,
  });
}

module.exports = {
  httpGetAllUsers,
  httpGetUserById,
  httpCreateUser,
  httpUpdateUser,
  httpDeleteUser,
  httpLoginUser,
};
