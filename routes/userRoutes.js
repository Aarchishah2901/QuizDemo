const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");
const { verifyToken, checkRole } = require("../middleware/authMiddleware");
const { body } = require("express-validator");

//Validation Middleware for Registration
const validateRegistration = [
    body("firstname").notEmpty().withMessage("First name is required"),
    body("lastname").notEmpty().withMessage("Last name is required"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters")
        .matches(/\d/)
        .withMessage("Password must contain at least one number"),
    body("phone_number").notEmpty().withMessage("Phone number is required"),
    body("gender").isIn(["Male", "Female", "Other"]).withMessage("Invalid gender selection"),
    body("role").isIn(["admin", "user"]).withMessage("Role must be either 'admin' or 'user'")
];


// router.post("/register", validateRegistration, userController.registerUser);
// router.get("/users", verifyToken, userController.getAllUsers);
// router.get("/user/:id", verifyToken, userController.getUserById);
// router.put("/user/:id", verifyToken, userController.updateUser);
// router.delete("/user/:id", verifyToken, userController.deleteUser);

router.post("/register", validateRegistration, userController.registerUser);
router.get("/users", verifyToken, checkRole(["admin"]), userController.getAllUsers);
router.get("/user/:id", verifyToken, checkRole(["admin"]), userController.getUserById);
router.put("/user/:id", verifyToken, userController.updateUser);
router.delete("/user/:id", verifyToken, checkRole(["admin"]), userController.deleteUser);

module.exports = router;