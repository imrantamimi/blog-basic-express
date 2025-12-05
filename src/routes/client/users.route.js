import express from 'express';
import { httpChangePassword, httpGetProfile, httpLoginUser, httpUpdateProfile } from '../../controllers/client/auth.controller.js';
import { protect, restrictTo } from '../../middleware/auth.middleware.js';

const userRouter = express.Router();

userRouter.post('/login', httpLoginUser);
userRouter.get('/profile', protect, restrictTo('user'), httpGetProfile);
userRouter.put('/updateProfile', protect, restrictTo('user'), httpUpdateProfile);
userRouter.post('changePassword', protect, restrictTo('user'), httpChangePassword);

export default userRouter;
