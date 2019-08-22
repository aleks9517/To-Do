const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const Users = mongoose.model('user');

passport.use(new LocalStrategy({
  usernameField: 'email[email]',
  passwordField: 'password[password]',
}, async (email, password, done) => {
  try{
    let user = await Users.findOne({ email });
    if(!user || !user.validatePassword(password, user)) {
      return done(null, false, { errors: { 'email or password': 'is invalid' } });
    }

    return done(null, user);
    } catch(err) {
      return done(err);
    }
  })
);