const express = require("express");
const { createQuestion, getQuestions, getQuestionById, updateQuestion, deleteQuestion, getAllQuestions} = require("../controllers/questionControllers");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/questions", authMiddleware, createQuestion);
router.get("/questions", authMiddleware, getQuestions);
router.get("/questions/:id", authMiddleware, getQuestionById);
router.put("/questions/:id", authMiddleware, updateQuestion);
router.delete("/questions/:id", authMiddleware, deleteQuestion);

module.exports = router;