import express from 'express';
import { httpChangePassword, httpGetProfile, httpLoginUser, httpUpdateProfile } from '../../controllers/client/auth.controller.js';

const userRouter = express.Router();

userRouter.post('/login', httpLoginUser);
userRouter.get('/profile', httpGetProfile);
userRouter.put('/updateProfile', httpUpdateProfile);
userRouter.post('changePassword', httpChangePassword);

export default userRouter;
