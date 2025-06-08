import express from 'express';
import { registerUser, loginUser, getProfile, updateProfile } from '../controllers/userController.js';
import userAuth from '../middleware/authUser.js';
import { upload } from '../middleware/multer.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);

userRouter.get('/get-profile', userAuth, getProfile);
userRouter.post('/update-profile', upload.single('image'), userAuth, updateProfile);

export default userRouter;