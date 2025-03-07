const Question = require("../models/questionModel");

exports.createQuestion = async (req, res) => {
    try
    {
        const { question_text, quiztype_id } = req.body;
        const newQuestion = new Question({ question_text, quiztype_id });
        await newQuestion.save();
        res.status(201).json({ message: "Question created succesfully", question: newQuestion });
    }
    catch (error)
    {
        res.status(500).json({ message: "Error creating question", error: error.message });
    }
};

exports.getAllQuestions = async (req, res ) => {
    try
    {
        const questions = await Question.find()
        res.status(200).json(questions);
    }
    catch (error)
    {
        res.status(500).json({ message: "Error retrieving questions", error: error.message });
    }
};

exports.getQuestionById = async (req, res) => {
    try
    {
        const question = await Question.findById(req.params.id);
        if (!question) return res.status(401).json({ message: "Question not found" });
        res.status(200).json(question);
    }
    catch (error)
    {
        res.status(500).json({ message: "Error retrieving question", error: error.message });
    }
};

exports.updateQuestion = async (req, res) => {
    try
    {
        const updatedQuestion = await Question.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!updatedQuestion)
            return res.status(404).json({ message: "Question not found" });
        res.status(200).json({ message: "Error updating question", question: updatedQuestion });
    }
    catch (error)
    {
        res.status(500).json({ message: "Error updating question", error: error.message });
    }
};

exports.deleteQuestion = async (req, res) => {
    try
    {
        await Question.findByIdAndDelete(req.params.id);
        if (!this.deleteQuestion)
            return res.status(404).json({ message: "Question not found" });
        res.status(200).json({ message: "Question deleted succesfully" });
    }
    catch (error)
    {
        res.status(500).json({ message:"Error deleting question", error: error.message });
    }
};