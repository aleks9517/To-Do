const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function (passport) {
  passport.serializeUser((user, done) => {
      done(null, user);
  });
  passport.deserializeUser((user, done) => {
      done(null, user);
  });
  passport.use(new GoogleStrategy({
      clientID: "938589251508-7c0ddbjfngln1ubce1nher4mfglosft6.apps.googleusercontent.com",
      clientSecret: "WqDrrjxFqOdNO6vah4Lsjt9x",
      callbackURL: '/api/google/callback'
  }, (token, refreshToken, profile, done) => {
      return done(null, {
        profile: profile,
        email: profile.emails[0].value,
        name: profile.name.givenName,
        token: token
    });
  }));
};