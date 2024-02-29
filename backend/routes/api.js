const express = require('express');
const router = express.Router();
const Todo = require('../modules/Todo');

router.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find({}).lean();
    res.status(200).json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/todos', async (req, res) => {
  try {
    const { title } = req.body;
    console.log(title);
    const newTodo = new Todo({ title });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  try {
    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    todo.completed = completed;
    await todo.save();

    res.status(200).json({ message: 'Todo updated successfully', todo });
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
