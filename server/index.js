const express = require('express');
const mongoose = require('mongoose');
const auth = require('./middleware/auth');

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// add new variable into process.env
require('dotenv').config({ path: `${__dirname}/.env` });

// Bodyparser Middleware
app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, { 
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false 
    });
    console.log('MongoDB Connected...');
  } catch(err) {
    console.error(err.message);
    process.exit(1); 
  }
}

connectDB();

// Use Routes
app.use('/api/items', auth, require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
