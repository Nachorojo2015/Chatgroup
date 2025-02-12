import { Router } from "express";
import { createPrivateChat } from "../controllers/privateController.js";

const privateRouter = Router()

privateRouter
             .post('/create/:idUserPrivate', createPrivateChat)

export { privateRouter }