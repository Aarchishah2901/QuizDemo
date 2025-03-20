const express = require("express");
const router = express.Router();
const roleController = require("../controllers/roleControllers");
const { verifyToken, checkRole } = require("../middleware/authMiddleware");

// CRUD Operations for Roles (Only Admin can manage roles)
router.post("/", verifyToken, checkRole(["admin"]), roleController.createRole);
router.get("/", verifyToken, checkRole(["admin"]), roleController.getAllRoles);
router.get("/:id", verifyToken, checkRole(["admin"]), roleController.getRoleById);
router.put("/:id", verifyToken, checkRole(["admin"]), roleController.updateRole);
router.delete("/:id", verifyToken, checkRole(["admin"]), roleController.deleteRole);

router.get("/admin/dashboard", verifyToken, checkRole(["admin"]), (req,res) => {
    res.json({ message: "Welcome Admin!" });
});

router.get("/user/dashboard", verifyToken, checkRole(["user"]), (res,req) => {
    res.json({ message: "Welcome User!" });
});

router.get("/moderator/dashboard", verifyToken, checkRole(["moderator"]), (req,res) => {
    res.json({ message: "Welcome Moderator!" });
});

router.get("/admin-moderator", verifyToken, checkRole(["admin","moderator"]), (req,res) => {
    res.json({ message: "Weclome Admin or Moderator" });
});

module.exports = router;