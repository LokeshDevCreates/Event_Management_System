const User = require('../models/Users');
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    // Debugging: Log incoming request
    console.log('Incoming data:', req.body);

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists:', email);
      return res.status(400).json({ message: 'User already exists' });
    }

    // Validate role
    if (!['organizer', 'attendee'].includes(role.toLowerCase())) {
      console.log('Invalid role:', role);
      return res.status(400).json({ message: 'Invalid role selected' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed password created.');

    // Save user
    const newUser = new User({ username, email, password: hashedPassword, role });
    await newUser.save();
    console.log('User saved successfully:', email);

    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    console.error('Error in registerUser:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


module.exports = { registerUser };
