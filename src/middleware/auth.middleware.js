import jwt from 'jsonwebtoken';
import { userDatabase } from '../models/users.mongo.js';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export async function protect(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      error: 'No token provided',
    });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await userDatabase.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        error: 'User no longer exists',
      });
    }
    req.user = user; // attach full user
    next();
  } catch (err) {
    return res.status(403).json({
      error: 'Invalid or expired token',
    });
  }
}
