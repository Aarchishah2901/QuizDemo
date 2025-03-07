const express = require("express");
const { createQuizType, getQuizTypes, getQuizTypeById, updateQuizType, deleteQuizType} = require("../controllers/quizTypecontroller");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/quiz-types", authMiddleware, createQuizType);
router.get("/", authMiddleware,getQuizTypes);
router.get("/:id", authMiddleware, getQuizTypeById);
router.put("/:id", authMiddleware, updateQuizType);
router.delete("/:id", authMiddleware, deleteQuizType);

module.exports = router;