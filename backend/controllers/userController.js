const User = require('../models/Users');
const bcrypt = require('bcryptjs');

// Register a new user
const registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    // Log incoming data for debugging
    console.log('Incoming data:', req.body);

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists:', email);
      return res.status(400).json({ message: 'User already exists. Try logging in instead.' });
    }

    // Validate role (no toLowerCase used)
    if (!['Attendee', 'Organizer'].includes(role)) {
      console.log('Invalid role:', role);
      return res.status(400).json({ message: 'Invalid role selected' });
    }

    // Conditional password handling for OAuth users
    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
      console.log('Password hashed successfully.');
    } else {
      console.log('Password not provided for OAuth user.');
    }

    // Save the user
    const newUser = new User({
      username,
      email,
      password: hashedPassword, // This can be null for OAuth users
      role,
    });
    await newUser.save();
    console.log('User saved successfully:', email);

    // Respond with success message and role
    res.status(201).json({
      message: 'User registered successfully',
      role: newUser.role,
    });

  } catch (error) {
    console.error('Error in registerUser:', error);

    // Enhanced error handling
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Invalid input data', error });
    }

    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found:', email);
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate password
    if (user.password) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        console.log('Invalid password for:', email);
        return res.status(401).json({ message: 'Invalid password' });
      }
    } else {
      console.log('Password-based login attempted for an OAuth user:', email);
      return res.status(403).json({
        message: 'Password-based login not allowed for OAuth users',
      });
    }

    // Respond with user details
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error('Error in loginUser:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { registerUser, loginUser };
