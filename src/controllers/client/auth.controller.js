import jwt from 'jsonwebtoken';
import { getUserByEmail, updateUser, getUserById } from '../../models/users.model.js';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export async function httpLoginUser(req, res) {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);
  if (!user) {
    res.status(404).json({
      error: 'User not found',
    });
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    res.status(401).json({
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

  return res.json({
    token: token,
  });
}

export async function httpGetProfile(req, res) {
  const user = req.user;
  return res.status(200).json(user);
}

export async function httpUpdateProfile(req, res) {
  const userId = req.user.id;
  const data = res.body;
  const user = await updateUser(data, userId);
  return res.status(200).json(user);
}

export async function httpChangePassword(req, res) {
  const userId = req.user.id;
  const { currentPassword, newPassword } = req.body;
  const user = await getUserById(userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found.' });
  }
  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) {
    return res.status(401).json({ error: 'Current password is incorrect.' });
  }
  user.password = newPassword;
  await user.save();
  return res.status(200).json({ message: 'Password changed successfully.' });
}
