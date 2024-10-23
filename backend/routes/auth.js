const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Ensure User model is imported
const bcrypt = require('bcryptjs');

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'User does not exist' }); // Send this error if user is not found
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' }); // Wrong password
    }

    // On success (assuming you're using JWT for authentication)
    res.json({ token: 'your-jwt-token', user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Signup route
router.post('/signup', async (req, res) => {
    const { email, password, name } = req.body;
  
    try {
      // Check if user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }
  
      // Create new user object
      user = new User({
        email,
        password,
        name
      });
  
      // Hash the password before saving to the database
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
  
      // Save user to the database
      await user.save();
  
      // Optionally, you can return a token if you're using JWT
      res.status(201).json({ msg: 'User registered successfully' });
  
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });
  

module.exports = router;

