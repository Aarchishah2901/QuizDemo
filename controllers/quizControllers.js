const Quiz = require("../models/quizModel");

exports.createQuiz = async (req, res) => {
    try
    {
        const { user_id, quiztype_name, question_id, answer_id, result_id } = req.body;
        const newQuiz = new Quiz({ user_id, quiztype_name, question_id, answer_id, result_id });
        await newQuiz.save();
        res.status(201).json(newQuiz);
    }
    catch (error)
    {
        res.status(500).json({ error: error.message });
    }
};

exports.getQuizzes = async (req, res) => {
    try
    {
        const quizzes = await Quiz.find().populate("user_id quiztype_name question_id answer_id result_id");
        res.status(201).json(quizzes);
    }
    catch (error)
    {
        res.status(500).json({ error: error.message });
    }
};