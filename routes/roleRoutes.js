const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleControllers');
const { verifyToken, checkRole } = require('../middleware/authMiddleware');
const checkPermission = require('../middleware/authMiddleware');

// router.post('/create', verifyToken, checkPermission('manage_roles'), roleController.createRole);
router.post('/create', verifyToken, roleController.createRole);
// router.get('/all', verifyToken, checkPermission('view_roles'), roleController.getAllRoles);
router.get('/all', verifyToken, roleController.getAllRoles);
// router.get('/:id', verifyToken, checkPermission('view_roles'), roleController.getRoleById);
router.get('/:id', verifyToken, roleController.getRoleById);
// router.post('/assign', verifyToken, checkPermission('manage_roles'), roleController.assignRole);
router.post('/assign', verifyToken, roleController.assignRole);
// router.delete('/delete/:roleId', verifyToken, checkPermission('manage_roles'), roleController.deleteRole);
router.delete('/delete/:roleId', verifyToken, roleController.deleteRole);

module.exports = router;