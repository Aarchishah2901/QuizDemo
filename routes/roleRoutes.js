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

router.post("/roles", authMiddleware, createRole);
router.get("/roles", authMiddleware, getAllRoles);
router.get("/roles/:roleID", authMiddleware, getRoleById);
router.put("/roles/:roleID", authMiddleware, updateRole);
router.delete("/roles/:roleID", authMiddleware, deleteRole);

module.exports = router;