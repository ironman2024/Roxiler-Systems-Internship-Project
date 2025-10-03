const express = require('express');
const { register, login, updatePassword } = require('../controllers/authController');
const { userValidation, passwordValidation } = require('../utils/validators');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.post('/register', userValidation, register);
router.post('/login', login);
router.put('/password', auth, passwordValidation, updatePassword);

module.exports = router;