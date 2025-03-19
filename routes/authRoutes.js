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
    body('phone_number').notEmpty().withMessage('phone number is required'),
    body('gender').isIn(['Male', 'Female', 'Other']).withMessage('Invalid gender selection')
  ],
  async (req, res) => {
    try {
      console.log("Register API hit", req.body);

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { firstname, lastname, email, password, phone_number, gender } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        firstname,
        lastname,
        email,
        password: hashedPassword,
        phone_number,
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

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  async (req, res) => {
    try {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      
      const { email, password } = req.body;
      console.log("Login attempt:", req.body);

      const user = await User.findOne({ email });
      console.log("user,",user);
      
      if (!user) {
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
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

// router.get(
//   '/user', passport.authenticate('jwt', { session: false }), async (req, res) => {
//   console.log("Authorization header:", req.headers.authorization);
//   console.log("REQ.USER", req.user);

//   if (!req.user) {
//     return res.status(401).json({ error: 'Unauthorized - Invalid Token' });
//   }

//   try {
//     res.status(200).json({
//       firstname: req.user.firstname,
//       lastname: req.user.lastname,
//       email: req.user.email,
//       gender: req.user.gender
//     });
//   } catch (error) {
//     console.error("User data fetch error:", error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// }
// );

// router.get(
//   '/users',
//   passport.authenticate('jwt', { session: false }),
//   async (req, res) => {
//     try {
//       console.log("Authorization header:", req.headers.authorization);
//       console.log("REQ.USER:", req.user);

//       if (req.user.role !== 'admin') {
//         return res.status(403).json({ error: 'Access denied - Admins only' });
//       }

//       await getAllUsers(req, res);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   }
// );

// router.put(
//   '/users/:id',
//   passport.authenticate('jwt', { session: false }),
//   async (req, res) => {
//     try {
//       if (req.user.role !== 'admin') {
//         return res.status(403).json({ error: 'Access denied - Admins only' });
//       }

//       await updateUser(req, res);
//     } catch (error) {
//       console.error("Error updating user:", error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   }
// );

// router.delete(
//   '/users/:id',
//   passport.authenticate('jwt', { session: false }),
//   async (req, res) => {
//     try {
//       if (req.user.role !== 'admin') {
//         return res.status(403).json({ error: 'Access denied - Admins only' });
//       }

//       await deleteUser(req, res);
//     } catch (error) {
//       console.error("Error deleting user:", error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   }
// );

module.exports = router;