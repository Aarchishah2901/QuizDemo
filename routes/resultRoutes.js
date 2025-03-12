const express = require("express");
const {
    submitResult,
    getAllResults,
    getResultById,
    getResultsByUserId,
    deleteResult,
} = require("../controllers/resultControllers");
const authMiddleware = require("../middleware/authMiddleware");


const router = express.Router();

router.post("/results", authMiddleware, submitResult);
router.get("/results", authMiddleware, getAllResults);
router.get("/results/:resultID", authMiddleware, getResultById);
router.get("/results/user/:userID", authMiddleware, getResultsByUserId);
router.delete("/results/:resultID", authMiddleware, deleteResult);

module.exports = router;