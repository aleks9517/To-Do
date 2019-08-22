const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('../../models/User');

router.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  // Simple validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
      // Check for existing user
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' })
    };

    const newUser = new User({
      name,
      email,
      password
    });

    // Create salt & hash
    const salt = await bcrypt.genSalt(10);

    newUser.password = await bcrypt.hash(newUser.password, salt);

    await newUser.save();

    res.json(newUser.toAuthJSON());
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
