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

router.post("/results", authMiddleware, submitResult); // Submit a result
router.get("/results", authMiddleware, getAllResults); // Get all results
router.get("/results/:resultID", authMiddleware, getResultById); // Get result by ID
router.get("/results/user/:userID", authMiddleware, getResultsByUserId); // Get results by User ID
router.delete("/results/:resultID", authMiddleware, deleteResult); // Delete a result

module.exports = router;