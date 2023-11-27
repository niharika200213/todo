import express from "express";
import {createTodo, deleteTodo, updateTodo, listAllTodos} from "../controllers/todoControllers";
const router = express.Router();

router.post('/todos', createTodo);
router.delete('/todos', deleteTodo);
router.patch('/todos', updateTodo);
router.get('/todos/:page', listAllTodos);

export default router;