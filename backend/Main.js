const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const apiRoutes = require('./routes/api');

const PORT = process.env.PORT || 3001;

// Подключаем статические файлы React
app.use(express.static(path.join(__dirname, 'build')));

// Маршрут для отображения главной страницы React
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Разрешаем парсинг данных из формы
app.use(express.urlencoded({ extended: true })); // Для обработки данных формы
app.use(express.json()); // Для обработки JSON данных
// Используем маршруты API
app.use('/api', apiRoutes); // Установите маршрут для `/api`

// Стартуем сервер и подключаемся к базе данных
async function start() {
  try {
    await mongoose.connect(
      'mongodb+srv://rushexe:kkkk1812@cluster0.rnfzwlz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    );
    app.listen(PORT, () => {
      console.log('Server has been started...');
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
}

start();
//mongodb+srv://rushexe:kkkk1812@cluster0.rnfzwlz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
