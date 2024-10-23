// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Ensure User model is imported
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, async (req, res) => {
    try {
      const user = await User.findById(req.user._id); // Assuming you store user ID in token
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

module.exports = router;
