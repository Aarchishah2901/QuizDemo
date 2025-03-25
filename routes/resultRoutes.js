const express = require("express");
const router = express.Router();
const resultController = require("../controllers/resultControllers");

router.post("/calculate", resultController.calculateResult);
router.get("/:user_id/:quiz_id", resultController.getResult);

module.exports = router;