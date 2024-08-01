const express = require('express');
const { login } = require('../auth/login');
const { signup } = require('../auth/signup');

const router = express.Router();

// authorization routes for signUp, adminSignUp and Login
router.post("/signup", signup);
router.post("/signup-admin", signup);
router.post("/login", login);

module.exports = router;