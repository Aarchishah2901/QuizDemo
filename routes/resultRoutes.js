const express = require("express");
const { getQuizResult, getUserResults } = require("../controllers/resultControllers");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/results", authMiddleware, getQuizResult);
router.get("/results", authMiddleware, getUserResults);

module.exports = router;