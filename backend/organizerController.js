const Organizer = require('../models/organizer');
const bcrypt = require('bcryptjs');
const sendEmail = require('../utils/sendEmail');

// Generate unique Organizer ID in the format OG10001
const generateOrganizerId = async () => {
  const last = await Organizer.findOne().sort({ createdAt: -1 });
  const lastId = last?.customOrganizerId?.slice(2) || "10000"; // Remove 'OG' if exists
  let newId = String(parseInt(lastId) + 1);

  // Ensure uniqueness (edge case)
  while (await Organizer.findOne({ customOrganizerId: `OG${newId}` })) {
    newId = String(parseInt(newId) + 1);
  }

  return `OG${newId}`;
};

exports.registerOrganizer = async (req, res) => {
  try {
    const {
      name,
      age,
      email,
      phone,
      password,
      confirmPassword,
      organizationType,
      organizationName,
      profession,
    } = req.body;

    // Check password match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Check phone format
    if (!/^\d{10}$/.test(phone)) {
      return res.status(400).json({ message: 'Phone number must be 10 digits' });
    }

    // Check if email already exists
    const existing = await Organizer.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Generate unique ID like OG10001
    const customOrganizerId = await generateOrganizerId();

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Get profile image path if uploaded
    const profileImage = req.files?.profileImage?.[0]?.path || null;

    // Create new organizer
    const newOrganizer = new Organizer({
      customOrganizerId,
      name,
      age,
      email,
      phone,
      password: hashedPassword,
      organizationType,
      organizationName,
      profession,
      profileImage,
    });

    const saved = await newOrganizer.save();

    // Send confirmation email
    await sendEmail(email, customOrganizerId);

    res.status(201).json({
      message: 'Registration successful',
      organizerId: customOrganizerId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Registration failed',
      error: err.message,
    });
  }
};

exports.loginOrganizer = async (req, res) => {
  const { email, password } = req.body;
  try {
    const organizer = await Organizer.findOne({ email });
    if (!organizer) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, organizer.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({
      message: 'Login successful',
      organizerId: organizer._id,
      name: organizer.name,
      email: organizer.email,
      phone: organizer.phone,
      profileImage: organizer.profileImage,
    });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};
