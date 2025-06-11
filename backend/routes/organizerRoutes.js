const express = require('express');
const router = express.Router();
const { registerOrganizer } = require('../controllers/organizerController');

router.post('/register', registerOrganizer); //POST api/organizers/register

module.exports = router;
