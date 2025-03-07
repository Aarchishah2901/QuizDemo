const Answer = require("../models/answerModel");

exports.submitAnswer = async (req, res) => {
    try
    {
        const { question_id, correct_answers, wrong_answers, attempted_question } = req.body;
        const newAnswer = new Answer({ question_id, correct_answers, wrong_answers, attempted_question });
        await newAnswer.save();
        res.status(201).json(newAnswer);
    }
    catch (error)
    {
        res.status(500).json({ error: error.message });
    }
};

exports.getAnswerByQuestionId = async (req, res) => {
    try
    {
        const answer = new Answer.findOne({ question_id: req.params.questionID });
        if (!answer)
            return res.status(404).json({ message: "Answer not found" });
        res.status(200).json(answer);
    }
    catch (error)
    {
        res.status(500).json({ error: error.message });
    }
};