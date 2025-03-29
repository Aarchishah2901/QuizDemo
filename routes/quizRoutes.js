// const express = require("express");
// const { createQuiz, getAllQuizzes, getQuizById, updateQuiz, deleteQuiz } = require("../controllers/quizControllers");
// const authMiddleware = require("../middleware/authMiddleware");

// const router = express.Router();

// router.post("/quizzes", authMiddleware, createQuiz);
// router.get("/quizzes", authMiddleware, getAllQuizzes);
// router.get("/quizzes/:quizID", authMiddleware, getQuizById);
// router.put("/quizzes/:quizID", authMiddleware, updateQuiz);
// router.delete("/quizzes/:quizID", authMiddleware, deleteQuiz);

// module.exports = router;

const express = require("express");
const { getQuestionsByQuizType } = require("../controllers/quizControllers");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

// Get questions for a specific quiz type
router.get("/quizzes/:id", verifyToken, getQuestionsByQuizType);

module.exports = router;