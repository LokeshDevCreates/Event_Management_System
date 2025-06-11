const Organizer = require('../models/organizer');
const bcrypt = require('bcryptjs');

//organizer registration

exports.registerOrganizer = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, organization } = req.body;

    // Extra safety: check passwords match (even though frontend validates)
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Check if email already exists
    const existing = await Organizer.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already registered' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save only required fields
    const organizer = new Organizer({
      name,
      email,
      password: hashedPassword,
      organization
    });

    const saved = await organizer.save();
    res.status(201).json({
      message: 'Registration successful',
      organizerId: saved._id
    });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};
