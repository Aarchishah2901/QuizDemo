const express = require("express");
const { submitAnswer, getAnswerByQuestionId } =require("../controllers/answerController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, submitAnswer);
router.get("/:QuestionID", authMiddleware, getAnswerByQuestionId);

module.exports = router;