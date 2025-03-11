const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const dotenv = require('dotenv');

dotenv.config();
const router = express.Router();

// **User Registration with Validation**
router.post(
  '/register',
  [
    body('firstname').notEmpty().withMessage('First name is required'),
    body('lastname').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters')
      .matches(/\d/)
      .withMessage('Password must contain at least one number'),
    body('gender').isIn(['Male', 'Female', 'Other']).withMessage('Invalid gender selection')
  ],
  async (req, res) => {
    try {
      console.log("Register API hit", req.body);

      // Validate request body
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { firstname, lastname, email, password, gender } = req.body;

      // Check if email exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const newUser = new User({
        firstname,
        lastname,
        email,
        password: hashedPassword,
        gender
      });

      await newUser.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

// **User Login with Validation**
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  async (req, res) => {
    try {
      console.log("Login attempt:", req.body.email);

      // Validate request body
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Compare passwords
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Generate JWT Token
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.status(200).json({ token });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

// **Get User Details (Protected)**
router.get('/user', passport.authenticate('jwt', { session: false }), async (req, res) => {
  console.log("Authorization header:", req.headers.authorization);
  console.log("REQ.USER", req.user);

  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized - Invalid Token' });
  }

  try {
    res.status(200).json({
      firstname: req.user.firstname,
      lastname: req.user.lastname,
      email: req.user.email,
      gender: req.user.gender
    });
  } catch (error) {
    console.error("User data fetch error:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;