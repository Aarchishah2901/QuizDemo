const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleControllers'); // Corrected import
const { verifyToken, checkRole } = require('../middleware/authMiddleware'); // Import only verifyToken
const checkPermission = require('../middleware/roleMiddleware'); // Middleware for permissions

// Role Management Routes
router.post('/create', verifyToken, checkPermission('manage_roles'), roleController.createRole);
router.get('/all', verifyToken, checkPermission('view_roles'), roleController.getAllRoles);
router.get('/:id', verifyToken, checkPermission('view_roles'), roleController.getRoleById);
router.post('/assign', verifyToken, checkPermission('manage_roles'), roleController.assignRole);
router.delete('/delete/:roleId', verifyToken, checkPermission('manage_roles'), roleController.deleteRole);

module.exports = router;