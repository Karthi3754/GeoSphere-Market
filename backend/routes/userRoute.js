import express from 'express';
import { adminLogin, loginUser, registerUser, sellerLogin } from '../controllers/userController.js';

const userRouter = express.Router();
userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/admin', adminLogin)
userRouter.post("/seller-login", sellerLogin)

export default userRouter;