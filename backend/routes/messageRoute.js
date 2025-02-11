import { Router } from "express";
import { getMessages, uploadFile } from "../controllers/messageController.js";
import multer from "multer";
import { storage } from "../config/multerConfig.js";

const upload = multer({ storage })

const messageRouter = Router()

messageRouter
            .get('/:id', getMessages)
            .post('/upload', upload.single('file'), uploadFile)

export { messageRouter }