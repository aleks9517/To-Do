const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const Users = mongoose.model('user');

passport.use(new LocalStrategy({
  usernameField: 'email[email]',
  passwordField: 'password[password]',
}, (email, password, done) => {
  Users.findOne({ email })
    .then((user) => {
      if(!user || !user.validatePassword(password, user)) {
        return done(null, false, { errors: { 'email or password': 'is invalid' } });
      }

      return done(null, user);
    }).catch(done);
}));