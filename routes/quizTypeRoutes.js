const express = require("express");
const { createQuizType, getQuizTypes, getQuizTypeById, updateQuizType, deleteQuizType} = require("../controllers/quizTypecontroller");
const authMiddleware  = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/quiz-types", authMiddleware, createQuizType);
router.get("/quiz-types", authMiddleware, getQuizTypes);
router.get("/quiz-types/:id", authMiddleware, getQuizTypeById);
router.put("/quiz-types/:id", authMiddleware, updateQuizType);
router.delete("/quiz-types/:id", authMiddleware, deleteQuizType);

module.exports = router;