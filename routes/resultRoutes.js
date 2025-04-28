const express = require("express");
const router = express.Router();
const { calculateResult, getResult } = require("../controllers/resultControllers");

router.post("/submit", calculateResult);
router.get("/result/:userId/:quizId", getResult);

module.exports = router;