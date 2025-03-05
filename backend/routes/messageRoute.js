import { Router } from "express";
import { getMessages, markAsSeen, uploadFile } from "../controllers/messageController.js";
import multer from "multer";
import { storage } from "../config/multerConfig.js";

const upload = multer({ storage })

const messageRouter = Router()

messageRouter
            .post('/upload', upload.single('file'), uploadFile)
            .post('/markAsSeen/:id', markAsSeen)
            .get('/:id', getMessages)

export { messageRouter }