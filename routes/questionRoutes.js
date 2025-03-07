const express = require("express");
const { createQuestion, getQuestions, getQuestionById, updateQuestion, deleteQuestion, getAllQuestions} = require("../controllers/questionControllers");
// const { authMiddleware } = require("../middleware/authMiddleware");
// const questionController = require("../controllers/questionControllers");

const router = express.Router();

// router.post("/", authMiddleware, createQuestion);
// router.get("/", authMiddleware, getAllQuestions);
// router.get("/:id", authMiddleware, getQuestionById);
// router.put("/:id", authMiddleware, updateQuestion);
// router.delete("/:id", authMiddleware, deleteQuestion);

router.post("/", createQuestion);
router.get("/", getAllQuestions);
router.get("/:id", getQuestionById);
router.put("/:id", updateQuestion);
router.delete("/:id", deleteQuestion);

module.exports = router;