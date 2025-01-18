import { Router } from "express";
import { getUser, searchUsersByUsername, updateAvatar } from "../controllers/userController.js";

const userRouter = Router()

userRouter
         .get('/', getUser)
         .put('/avatar', updateAvatar)
         .get('/:username', searchUsersByUsername)


export { userRouter }