const express = require('express');
const mongoose = require('mongoose');
const auth = require('./middleware/auth');
const passport = require("passport");
const session = require('express-session');
const cookieParser = require('cookie-parser'); 
const cookieSession = require('cookie-session');

const app = express();

// add new variable into process.env
require('dotenv').config({ path: `${__dirname}/.env` });

app.use(cookieSession({
  name: 'session',
  keys: ['123'],
  maxAge: 24 * 60 * 60 * 1000
}));

app.use(cookieParser());
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'sl_myJwtSecret', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

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
require('./models/User');
require('./config/passport');

const googleAuth = require('./config/googlePassport');
googleAuth(passport);

app.use(passport.initialize());

// Use Routes
app.use('/api/items', auth, require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/google', require('./routes/api/googleAuth'));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));