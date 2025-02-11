import { Router } from "express";
import { getUser, searchUsersByUsername, updateAvatar } from "../controllers/userController.js";
import multer from "multer";
import { storage } from "../config/multerConfig.js";

const upload = multer({ storage })

const userRouter = Router()

userRouter
         .get('/', getUser)
         .put('/avatar', upload.single('avatar'), updateAvatar)
         .get('/:username', searchUsersByUsername)


export { userRouter }