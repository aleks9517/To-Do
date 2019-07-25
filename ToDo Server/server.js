const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const todo = require('./routes/api/todo');
const PORT = 4000;

app.use(cors());
app.use(express.json({ extended: false }));

connectDB();

app.use('/api/users', require('./routes/api/users'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/todos', todo);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});