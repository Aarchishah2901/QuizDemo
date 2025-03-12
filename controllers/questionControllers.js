const Question = require("../models/questionModel");

exports.createQuestion = async (req, res) => {
    try {
        const { question_text, quiztype_id, options, correct_answer } = req.body;

        if (!quiztype_id || !question_text || !options || options.length < 2 || !correct_answer) {
            return res.status(400).json({ message: "All fields are required, and options must have at least 2 choices." });
        }

        if (!options.includes(correct_answer)) {
            return res.status(400).json({ message: "Correct answer must be one of the provided options." });
        }

        const newQuestion = new Question({ question_text, quiztype_id, options, correct_answer });
        await newQuestion.save();

        res.status(201).json(newQuestion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getQuestions = async (req, res) => {
    try {
        const questions = await Question.find().populate("quiztype_id", "quiztype_name");
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getQuestionById = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id).populate("quiztype_id", "quiztype_name");
        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }
        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateQuestion = async (req, res) => {
    try {
        const updatedQuestion = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedQuestion) {
            return res.status(404).json({ message: "Question not found" });
        }
        res.status(200).json(updatedQuestion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteQuestion = async (req, res) => {
    try {
        const deletedQuestion = await Question.findByIdAndDelete(req.params.id);
        if (!deletedQuestion) {
            return res.status(404).json({ message: "Question not found" });
        }
        res.status(200).json({ message: "Question deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};