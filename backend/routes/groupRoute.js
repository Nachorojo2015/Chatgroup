import { Router } from "express";
import { createGroup, deleteGroup, editGroup, joinGroup, leaveGroup, searchGroupByName } from "../controllers/groupController.js";
import multer from "multer";
import { storage } from "../config/multerConfig.js";

const upload = multer({ storage })

const groupRouter = Router()

groupRouter
           .post('/create/:name', upload.single('image'), createGroup)
           .get('/search/:name', searchGroupByName)
           .delete('/delete/:_id', deleteGroup)
           .put('/edit/:_id', editGroup)
           .post('/join/:_id', joinGroup)
           .put('/leave/:_id', leaveGroup)

export { groupRouter }