import { Router } from "express";
import { getMessages } from "../controllers/messageController.js";

const messageRouter = Router()

messageRouter
            .get('/:id', getMessages)

export { messageRouter }