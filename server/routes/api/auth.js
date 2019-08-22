const express = require('express');
const router = express.Router();;
const passport = require('passport');
const auth = require('../../middleware/auth');
const User = require('../../models/User');

router.post('/', async (req, res, next) => {
  const { email, password } = req.body;

  // Simple validation
  if(!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if(err) {
      return next(err);
    }

    if(passportUser) {
      const user = passportUser; 
      return res.json(user.toAuthJSON());
    }

    return res.status(400).info;
  })(req, res, next);
});

router.get('/user', auth, async (req, res) => {
  let user = await User.findById(req.user.id).select('-password');
  res.json(user.toAuthJSON());
});

module.exports = router;
