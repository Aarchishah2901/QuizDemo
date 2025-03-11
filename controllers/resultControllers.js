// const Result = require("../models/resultModel");

// exports.submitResult = async (req, res) => {
//     try
//     {
//         const { user_id, question_id, total_mark } = req.body;
//         const newResult = new Result({ user_id, question_id, total_mark });
//         await newResult.save();
//         res.status(201).json(newResult);
//     }
//     catch (error)
//     {
//         res.status(500).json({ error: error.message });
//     }
// };

// exports.getResultbyUserId = async (req, res) => {
//     try
//     {
//         const results = await Result.find({ user_id: req.params.user_ID });
//         res.status(200).json(results)
//     }
//     catch (error)
//     {
//         res.status(500).json({ error: error.message });
//     }
// };

const Result = require("../models/resultModel");

// 📌 Create a new result
exports.submitResult = async (req, res) => {
    try {
        const { user_id, quiz_id, score, total_questions, correct_answers } = req.body;

        const newResult = new Result({
            user_id,
            quiz_id,
            score,
            total_questions,
            correct_answers,
        });

        await newResult.save();
        res.status(201).json(newResult);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 📌 Get all results
exports.getAllResults = async (req, res) => {
    try {
        const results = await Result.find().populate("user_id quiz_id");
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 📌 Get result by ID
exports.getResultById = async (req, res) => {
    try {
        const result = await Result.findById(req.params.resultID).populate("user_id quiz_id");
        if (!result) return res.status(404).json({ message: "Result not found" });

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 📌 Get results by User ID
exports.getResultsByUserId = async (req, res) => {
    try {
        const results = await Result.find({ user_id: req.params.userID }).populate("quiz_id");
        if (!results.length) return res.status(404).json({ message: "No results found for this user" });

        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 📌 Delete result
exports.deleteResult = async (req, res) => {
    try {
        const result = await Result.findByIdAndDelete(req.params.resultID);
        if (!result) return res.status(404).json({ message: "Result not found" });

        res.status(200).json({ message: "Result deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};