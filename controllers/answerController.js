const Answer = require("../models/answerModel");
const Question = require("../models/questionModel");

exports.submitAnswer = async (req, res) => {
    try {
        const { question_id, answer_text, correct_answer } = req.body;

        if (!question_id || !answer_text || correct_answer === undefined) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const newAnswer = new Answer({ question_id, answer_text, correct_answer });
        await newAnswer.save();
        res.status(201).json(newAnswer);
    } catch (error) {
        console.error("Submit Answer Error:", error);
        res.status(500).json({ error: error.message });
    }
};

exports.getAnswerByQuestionId = async (req, res) => {
    try {
        const answer = await Answer.findOne({ question_id: req.params.questionID });

        if (!answer) {
            return res.status(404).json({ message: "Answer not found" });
        }

        res.status(200).json(answer);
    } catch (error) {
        console.error("Get Answer Error:", error);
        res.status(500).json({ error: error.message });
    }
};

exports.checkAnswer = async (req, res) => {
    try {
        const { question_id, answer_text } = req.body;

        if (!question_id || !answer_text) {
            return res.status(400).json({ error: "Question ID and answer text are required" });
        }

        const correctAnswer = await Answer.findOne({ question_id, correct_answer: true });

        if (!correctAnswer) {
            return res.status(404).json({ error: "Correct answer not found for this question" });
        }

        const isCorrect = correctAnswer.answer_text === answer_text;

        res.status(200).json({
            message: isCorrect ? "Correct answer!" : "Wrong answer!",
            correct_answer: correctAnswer.answer_text,
            isCorrect
        });
    } catch (error) {
        console.error("Check Answer Error:", error);
        res.status(500).json({ error: error.message });
    }
};