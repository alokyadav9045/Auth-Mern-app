const express = require('express');
const { login, signup } = require('../Controllers/AuthController');
const { signupValiation, loginValiation } = require('../Middlewares/Authvalidation');

const router = express.Router();

router.post('/login', loginValiation, login,message:"login");
router.post('/signup', signupValiation, signup);

module.exports = router;
