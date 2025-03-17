const Question = require("../models/questionModel");
const Result = require("../models/resultModel");

// ✅ Get Quiz Result after submission
exports.getQuizResult = async (req, res) => {
    try {
        const { quiztype_name, user_answers } = req.body;
        const user_id = req.user._id;

        const questions = await Question.aggregate([
            {
                $lookup: {
                    from: "quiztypes",
                    localField: "quiztype_id",
                    foreignField: "_id",
                    as: "quiztype"
                }
            },
            { $match: { "quiztype.quiztype_name": quiztype_name } },
            { $project: { correct_answer: 1, question_text: 1 } } // Show correct_answer after quiz is completed
        ]);

        if (!questions.length) {
            return res.status(404).json({ message: "No questions found for this quiz type" });
        }

        let correctCount = 0;
        let incorrectCount = 0;
        let answersArray = [];

        questions.forEach((question) => {
            const userAnswer = user_answers.find(ans => ans.question_id.toString() === question._id.toString());

            const isCorrect = userAnswer?.selected_answer === question.correct_answer;
            if (isCorrect) {
                correctCount++;
            } else {
                incorrectCount++;
            }

            answersArray.push({
                question_id: question._id,
                question_text: question.question_text,
                selected_answer: userAnswer?.selected_answer || "No Answer",
                correct_answer: question.correct_answer,
                isCorrect
            });
        });

        // Save result in database
        const newResult = new Result({
            user_id,
            quiztype_name,
            total_questions: questions.length,
            correct_answers: correctCount,
            incorrect_answers: incorrectCount,
            answers: answersArray
        });

        await newResult.save();

        res.status(200).json({ 
            totalQuestions: questions.length, 
            correctCount, 
            incorrectCount, 
            answers: answersArray 
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUserResults = async (req, res) => {
    try {
        const user_id = req.user._id; // Get user ID from auth middleware

        const results = await Result.find({ user_id })
            .populate("answers.question_id", "question_text") // Populate question text
            .sort({ createdAt: -1 }); // Show latest results first

        if (!results.length) {
            return res.status(404).json({ message: "No results found for this user" });
        }

        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};