const express = require('express');
const router = express.Router();
const User = require('../models/Users');  // make sure you import your User model here!
const { registerUser, loginUser } = require('../controllers/userController');

// POST /api/users/register
router.post('/register', registerUser);

// POST /api/users/login
router.post('/login', loginUser);

// GET /api/users/:email  - get user details by email (for role fetch)
router.get('/:email', async (req, res) => {
  const email = req.params.email;
  try {
    const user = await User.findOne({ email }).select('role username email');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Error fetching user by email:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/users - Fetch all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('username email role createdAt updatedAt');
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error while fetching users' });
  }
});

module.exports = router;
