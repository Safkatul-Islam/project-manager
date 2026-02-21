const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUsers } = require('../controllers/userController.js');

// Route for Registration
router.post('/register', registerUser);
// Route for Login
router.post('/login', loginUser);
// Route to fetch all users
router.get('/', getUsers);

module.exports = router;