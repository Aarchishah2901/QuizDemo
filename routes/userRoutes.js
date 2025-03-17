const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');
const { verifyToken, checkRole } = require('../middleware/authMiddleware');

router.get('/all', verifyToken, checkRole(['admin']), userController.getAllUsers);
router.get('/:id', verifyToken, userController.getUserById);
router.put('/update/:id', verifyToken, checkRole(['admin']), userController.updateUser);
router.delete('/delete/:id', verifyToken, checkRole(['admin']), userController.deleteUser);

module.exports = router;