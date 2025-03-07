const express = require("express");
const { submitResult, getResultByUserId } = require("../controllers/resultControllers");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, submitResult);
router.get("/user/user_ID", authMiddleware, getResultByUserId);

module.exports = router;