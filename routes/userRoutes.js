const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');
const { verifyToken, checkRole, authMiddleware } = require('../middleware/authMiddleware');

router.get('/users', verifyToken, userController.getAllUsers);
router.get('/user/:id', verifyToken, userController.getUserById);
router.put('/user/:id', verifyToken, userController.updateUser);
router.delete('/user/:id', verifyToken, userController.deleteUser);

// router.get('/users', verifyToken, checkRole(['admin']), userController.getAllUsers);
// router.get('/user/:id', verifyToken, checkRole(['admin']), userController.getUserById);
// router.put('/user/:id', verifyToken, userController.updateUser);
// router.delete('/user/:id', verifyToken, checkRole(['admin']), userController.deleteUser);

module.exports = router;