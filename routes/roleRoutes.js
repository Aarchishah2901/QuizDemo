const express = require("express");
const { createRole, getRoles } = require("../controllers/roleControllers");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createRole);
router.get("/", authMiddleware, getRoles);

module.exports = router;