const express = require("express");
const { submitAnswer, getAnswerByQuestionId } =require("../controllers/answerController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/answers", authMiddleware, submitAnswer);
router.get("/answers/:questionID", authMiddleware, getAnswerByQuestionId);

module.exports = router;