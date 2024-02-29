const express = require('express');
const router = express.Router();
const Todo = require('../modules/Todo');

// Маршрут для получения списка всех задач
router.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find({}).lean();
    res.status(200).json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Маршрут для создания новой задачи
router.post('/todos', async (req, res) => {
  try {
    const { title } = req.body;
    console.log(title); // Проверка, что данные корректно извлечены
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
    // Найдите задачу в базе данных по ее идентификатору
    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    // Обновите состояние выполнения задачи
    todo.completed = completed;
    await todo.save();

    // Отправьте ответ с сообщением об успешном обновлении
    res.status(200).json({ message: 'Todo updated successfully', todo });
  } catch (error) {
    console.error('Error updating todo:', error);
    // Обработайте возможные ошибки и отправьте соответствующий статус и сообщение об ошибке
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
