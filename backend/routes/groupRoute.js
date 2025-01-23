import { Router } from "express";
import { createGroup, deleteGroup, searchGroupByName } from "../controllers/groupController.js";

const groupRouter = Router()

groupRouter
           .post('/create', createGroup)
           .get('/search/:name', searchGroupByName)
           .delete('/delete/:_id', deleteGroup)

export { groupRouter }