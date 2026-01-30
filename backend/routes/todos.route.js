import express from 'express';
import { getAllTodos, createTodo, deleteTodo, updateTodo } from '../controllers/todo.controller.js';
const router = express.Router();

router.get('/todos', getAllTodos);
router.post('/create-todo', createTodo);
router.delete('/delete-todo/:id', deleteTodo);
router.post('/update-todo/:id', updateTodo);

export default router;
