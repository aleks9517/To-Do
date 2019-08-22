const passport = require('passport');
const express = require('express');
const router = express.Router();
const User = require('../../models/User');

router.get('/result', async (req, res) => {
  const { name, email } = req.session.passport.user;

  try {
    let user = await User.findOne({ email });
    if (user) {
      res.cookie('token', user.toAuthJSON().token);
      res.redirect('http://localhost:3000/');    
    } else {     
      const newUser = new User({
        name,
        email
      });

      await newUser.save();

      res.cookie('token', newUser.toAuthJSON().token);
      res.redirect('http://localhost:3000/');
    };
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/', passport.authenticate('google', {
  scope: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'
  ]
}));

router.get('/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
      res.redirect('/api/google/result');
  }
);

router.get('/logout', (req, res) => {
  req.logout();
  res.clearCookie("token");
  res.redirect('http://localhost:3000/');
});

module.exports = router;

