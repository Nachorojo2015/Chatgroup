import { Router } from "express";
import { blockUser, createGroup, deleteGroup, editGroup, joinGroup, leaveGroup, searchGroupByName, unlockUser } from "../controllers/groupController.js";
import multer from "multer";
import { storage } from "../config/multerConfig.js";

const upload = multer({ storage })

const groupRouter = Router()

groupRouter
           .post('/create/:name', upload.single('image'), createGroup)
           .get('/search/:name', searchGroupByName)
           .delete('/delete/:_id', deleteGroup)
           .put('/edit/:_id', upload.single('image'), editGroup)
           .post('/join/:_id', joinGroup)
           .put('/leave/:_id', leaveGroup)
           .put('/block/:_id/:idUser', blockUser)
           .put('/unlock/:_id/:idUser', unlockUser)

export { groupRouter }