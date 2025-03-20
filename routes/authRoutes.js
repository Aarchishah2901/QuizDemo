const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const dotenv = require('dotenv');

dotenv.config();
const router = express.Router();

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  async (req, res) =>{
    try
    {
      const errors = validationResult(req);
      if (!errors.isEmpty())
      {
        return res.status(400).json({ errors: errors.array() });
      }
      
      const { email, password } = req.body;
      console.log("Login attempt:", req.body);

      const user = await User.findOne({ email });
      console.log("user,",user);
      
      if (!user)
      {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      console.log("Entered Password:", password);
      console.log("Stored Hashed Password:", user.password)
      // const passwordMatch = await bcrypt.compare(password, user.password);
      // console.log(passwordMatch);
      
      // if (!password) {
      //   return res.status(401).json({ error: 'Invalid credentials' });
      // }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '10h' }
      );

      res.status(200).json({ token });
    }
    catch (error)
    {
      console.error("Login error:", error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

module.exports = router;