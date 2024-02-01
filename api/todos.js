const express = require('express');
const { addTodo, updateTodos, deleteTodos, todos } = require('../controller/todo.controller');
const router = express.Router();

router.get('/todos/:id', todos);
router.post('/addTodo/:id', addTodo); 
router.put('/updateTodos/:id', updateTodos);
router.delete('/deleteTodos/:id', deleteTodos);


module.exports = router
