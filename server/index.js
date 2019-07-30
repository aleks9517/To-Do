const express = require('express');
const mongoose = require('mongoose');

const app = express();
// add new variable into process.env
require('dotenv').config({ path: `${__dirname}/.env` });

// Bodyparser Middleware
app.use(express.json());

// Connect to Mongo
mongoose
  .connect(process.env.DB_URL, { 
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false 
  }) // Adding new mongo url parser
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Use Routes
app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
