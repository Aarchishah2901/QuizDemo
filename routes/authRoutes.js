const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authControllers');
const authMiddleware = require('../middleware/authMiddleware');
const passport = require('passport');

const router = express.Router();

// Registration Route
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
    authController.register
);

// Login Route
router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Invalid email format'),
        body('password').notEmpty().withMessage('Password is required')
],
    authController.login
);

// Get User Details (Protected)
// router.get('/user', passport.authenticate('jwt', { session: false }), authController.getUser);
router.get('/user', authMiddleware, authController.getUser);

module.exports = router;