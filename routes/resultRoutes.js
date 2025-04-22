const express = require("express");
const router = express.Router();
const { calculateResult } = require("../controllers/resultControllers");

router.post("/submit", calculateResult);

module.exports = router;