import { Router } from "express";
import { createGroup, deleteGroup, editGroup, searchGroupByName } from "../controllers/groupController.js";

const groupRouter = Router()

groupRouter
           .post('/create', createGroup)
           .get('/search/:name', searchGroupByName)
           .delete('/delete/:_id', deleteGroup)
           .put('/edit/:_id', editGroup)

export { groupRouter }