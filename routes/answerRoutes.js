const express = require("express");
const router = express.Router();
const answerController = require("../controllers/answerController");

router.post("/submit", answerController.submitAnswer);
router.get("/:user_id/:quiz_id", answerController.getUserAnswers);

module.exports = router;