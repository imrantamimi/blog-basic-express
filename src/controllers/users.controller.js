const { getAllUsers, createUser, getUserById, updateUser, deleteUser } = require('../models/users.model');
const { getPagination } = require('../utils/query');

async function httpGetAllUsers(req, res) {
  const { skip, limit } = getPagination(req.query);
  const users = await getAllUsers(skip, limit);
  return res.status(200).json(users);
}

async function httpCreateUser(req, res) {
  try {
    const user = req.body;
    await createUser(user);
    return res.status(201).json(user);
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

module.exports = {
  httpGetAllUsers,
  httpGetUserById,
  httpCreateUser,
  httpUpdateUser,
  httpDeleteUser,
};
