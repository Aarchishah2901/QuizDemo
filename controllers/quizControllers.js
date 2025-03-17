const Question = require("../models/questionModel");

exports.getQuestionsByQuizType = async (req, res) => {
    try {
        const { quiztype_name } = req.params;
        console.log("Received quiztype_name:", quiztype_name);

        const questions = await Question.find({
            quiztype_name: { $regex: new RegExp("^" + quiztype_name + "$", "i") }
        });

        console.log("Questions Found:", questions);

        if (!questions || questions.length === 0) {
            console.log("No questions found for this quiz type:", quiztype_name);
            return res.status(404).json({ message: "No questions found for this quiz type" });
        }

        res.status(200).json(questions);
    } catch (error) {
        console.error("Get Questions Error:", error);
        res.status(500).json({ error: error.message });
    }
};