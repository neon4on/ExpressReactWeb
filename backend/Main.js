const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const apiRoutes = require('./routes/api');

const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', apiRoutes);

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
