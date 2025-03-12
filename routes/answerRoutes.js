const express = require("express");
const { submitAnswer, getAnswerByQuestionId, checkAnswer } = require("../controllers/answerController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/answers", authMiddleware, submitAnswer);
router.get("/answers/:questionID", authMiddleware, getAnswerByQuestionId);
router.post("/answers/check", authMiddleware, checkAnswer);  // New route for checking answers

module.exports = router;