import jwt from 'jsonwebtoken';

import { getAllUsers, createUser, getUserByEmail, getUserById, updateUser, deleteUser } from '../models/users.model.js';
import { getPagination } from '../utils/query.js';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export async function httpGetAllUsers(req, res) {
  const { skip, limit } = getPagination(req.query);
  const users = await getAllUsers(skip, limit);
  return res.status(200).json(users);
}

export async function httpCreateUser(req, res) {
  try {
    const data = req.body;
    const user = await createUser(data);
    return res.status(200).json(user);
  } catch (err) {
    throw new Error(err);
  }
}

export async function httpGetUserById(req, res) {
  const userId = req.params.id;
  const user = await getUserById(userId);
  return res.status(200).json(user);
}

export async function httpUpdateUser(req, res) {
  const userId = req.params.id;
  const user = req.body;
  await updateUser(user, userId);
  return res.status(200).json(user);
}

export async function httpDeleteUser(req, res) {
  const userId = req.params.id;
  await deleteUser(userId);
  return res.status(201).json({
    ok: true,
  });
}

export async function httpLoginUser(req, res) {
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
