// const express = require("express");
// const { createRole, getRoles, getRoleById, updateRole, deleteRole } = require("../controllers/roleControllers");
// const authMiddleware  = require("../middleware/authMiddleware");

// const router = express.Router();

// router.post("/roles", authMiddleware, createRole);
// router.get("/roles", authMiddleware, getRoles);
// router.get("/roles/:id", authMiddleware, getRoleById);
// router.put("/roles/:id", authMiddleware, updateRole);
// router.delete("/roles/:id", authMiddleware, deleteRole);

// module.exports = router;

const express = require("express");
const {
    createRole,
    getAllRoles,
    getRoleById,
    updateRole,
    deleteRole,
} = require("../controllers/roleControllers");
const authMiddleware  = require("../middleware/authMiddleware");


const router = express.Router();

router.post("/roles", authMiddleware, createRole); // Create a role
router.get("/roles", authMiddleware, getAllRoles); // Get all roles
router.get("/roles/:roleID", authMiddleware, getRoleById); // Get a role by ID
router.put("/roles/:roleID", authMiddleware, updateRole); // Update a role
router.delete("/roles/:roleID", authMiddleware, deleteRole); // Delete a role

module.exports = router;