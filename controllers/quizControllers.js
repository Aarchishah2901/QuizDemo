// const Quiz = require("../models/quizModel");

// exports.createQuiz = async (req, res) => {
//     try
//     {
//         const { user_id, quiztype_name, question_id, answer_id, result_id } = req.body;
//         const newQuiz = new Quiz({ user_id, quiztype_name, question_id, answer_id, result_id });
//         await newQuiz.save();
//         res.status(201).json(newQuiz);
//     }
//     catch (error)
//     {
//         res.status(500).json({ error: error.message });
//     }
// };

// exports.getQuizzes = async (req, res) => {
//     try
//     {
//         const quizzes = await Quiz.find().populate("user_id quiztype_name question_id answer_id result_id");
//         res.status(201).json(quizzes);
//     }
//     catch (error)
//     {
//         res.status(500).json({ error: error.message });
//     }
// };

// const Quiz = require("../models/quizModel");
// const Question = require("../models/questionModel");

// exports.createQuiz = async (req, res) => {
//     try {
//         const { title, description, questions } = req.body;

//         if (!title) {
//             return res.status(400).json({ error: "Quiz title is required" });
//         }

//         const newQuiz = new Quiz({ title, description, questions });
//         await newQuiz.save();

//         res.status(201).json(newQuiz);
//     } catch (error) {
//         console.error("Create Quiz Error:", error);
//         res.status(500).json({ error: error.message });
//     }
// };

// exports.getAllQuizzes = async (req, res) => {
//     try {
//         const quizzes = await Quiz.find().populate("questions");
//         res.status(200).json(quizzes);
//     } catch (error) {
//         console.error("Get All Quizzes Error:", error);
//         res.status(500).json({ error: error.message });
//     }
// };

// exports.getQuizById = async (req, res) => {
//     try {
//         const quiz = await Quiz.findById(req.params.quizID).populate("questions");

//         if (!quiz) {
//             return res.status(404).json({ message: "Quiz not found" });
//         }

//         res.status(200).json(quiz);
//     } catch (error) {
//         console.error("Get Quiz By ID Error:", error);
//         res.status(500).json({ error: error.message });
//     }
// };

// exports.updateQuiz = async (req, res) => {
//     try {
//         const { title, description, questions } = req.body;

//         const updatedQuiz = await Quiz.findByIdAndUpdate(
//             req.params.quizID,
//             { title, description, questions },
//             { new: true, runValidators: true }
//         );

//         if (!updatedQuiz) {
//             return res.status(404).json({ message: "Quiz not found" });
//         }

//         res.status(200).json(updatedQuiz);
//     } catch (error) {
//         console.error("Update Quiz Error:", error);
//         res.status(500).json({ error: error.message });
//     }
// };

// exports.deleteQuiz = async (req, res) => {
//     try {
//         const deletedQuiz = await Quiz.findByIdAndDelete(req.params.quizID);

//         if (!deletedQuiz) {
//             return res.status(404).json({ message: "Quiz not found" });
//         }

//         res.status(200).json({ message: "Quiz deleted successfully" });
//     } catch (error) {
//         console.error("Delete Quiz Error:", error);
//         res.status(500).json({ error: error.message });
//     }
// };

const Question = require("../models/questionModel");

exports.getQuestionsByQuizType = async (req, res) => {
    try {
        const { quiztype_name } = req.params;

        // Fetch questions that match the given quiz type
        const questions = await Question.find({ quiztype_name });

        if (!questions || questions.length === 0) {
            return res.status(404).json({ message: "No questions found for this quiz type" });
        }

        res.status(200).json(questions);
    } catch (error) {
        console.error("Get Questions Error:", error);
        res.status(500).json({ error: error.message });
    }
};