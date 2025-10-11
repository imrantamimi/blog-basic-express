import { userDatabase } from '../../models/users.mongo.js';

export const isUniqueEmail = async (email, { req }) => {
  const existingUser = await userDatabase.findOne({ email });

  // If no user with this email then ok
  if (!existingUser) {
    return true;
  }

  // If updating profile i.e. same user
  if (req.user && existingUser._id.toString() === req.user._id.toString()) {
    return true;
  }

  throw new Error('Email already in use');
};
