import { Router } from "express";
import { getAllUsers, registerUser } from "../controllers/user.controller.js";
const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.get('/users', getAllUsers)

export default userRouter;
