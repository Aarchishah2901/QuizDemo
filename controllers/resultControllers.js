const Result = require("../models/resultModel");

exports.submitResult = async (req, res) => {
    try
    {
        const { user_id, question_id, total_mark } = req.body;
        const newResult = new Result({ user_id, question_id, total_mark });
        await newResult.save();
        res.status(201).json(newResult);
    }
    catch (error)
    {
        res.status(500).json({ error: error.message });
    }
};

exports.getResultbyUserId = async (req, res) => {
    try
    {
        const results = await Result.find({ user_id: req.params.user_ID });
        res.status(200).json(results)
    }
    catch (error)
    {
        res.status(500).json({ error: error.message });
    }
};