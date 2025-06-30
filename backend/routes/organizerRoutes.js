const express = require('express');
const router = express.Router();
const { registerOrganizer, loginOrganizer } = require('../controllers/organizerController');
const upload = require('../middlewares/upload');

// Registration with image upload
router.post(
  '/register',
  upload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'eventImages', maxCount: 5 }
  ]),
  registerOrganizer
);

// Login
router.post('/login', loginOrganizer);

module.exports = router;
