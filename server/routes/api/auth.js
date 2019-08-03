const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

const User = require('../../models/User');

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if(!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }
  try {
    let user = await User.findOne({ email });
    if(!user) {
      return res.status(400).json({ msg: 'User does not exist' })
    };

    const isMatch = await bcrypt.compare(password, user.password);   
    if(!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' })
    };

    const payload = {
      id: user.id,
      email: user.email
    }

    jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY,
      { expiresIn: 3600 },
      (err, token) => {
        if(err) throw err; 
        res.json({
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email
          }
        });
      }
    )

  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/user', auth, async (req, res) => {
  let user = await User.findById(req.user.id).select('-password');
  res.json(user);
});

module.exports = router;
