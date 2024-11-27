const express = require('express');
const { registerUser, loginUser } = require('../controller/authController');

const router = express.Router();

router.post('/register', registerUser); // Corrected spelling of registerUser
router.post('/login', loginUser);

module.exports = router;
