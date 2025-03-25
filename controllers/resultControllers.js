const mongoose = require("mongoose");
const Result = require("../models/resultModel");
const Answer = require("../models/answerModel");

//Calculate and Store Result
exports.calculateResult = async (req, res) => {
    try {
        const { user_id, quiz_id } = req.body;

        // Aggregate user answers
        const resultData = await Answer.aggregate([
            { $match: { user_id: new mongoose.Types.ObjectId(user_id), quiz_id: new mongoose.Types.ObjectId(quiz_id) } },
            {
                $lookup: {
                    from: "questions",
                    localField: "question_id",
                    foreignField: "_id",
                    as: "questionDetails"
                }
            },
            { $unwind: "$questionDetails" },
            {
                $project: {
                    _id: 1,
                    question_id: 1,
                    selected_option: 1,
                    correct_answer: "$questionDetails.correct_answer"
                }
            },
            {
                $group: {
                    _id: null,
                    total_questions: { $sum: 1 },
                    correct_answers: {
                        $sum: {
                            $cond: [{ $eq: ["$selected_option", "$correct_answer"] }, 1, 0]
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    total_questions: 1,
                    correct_answers: 1,
                    incorrect_answers: { $subtract: ["$total_questions", "$correct_answers"] },
                    score_percentage: { $multiply: [{ $divide: ["$correct_answers", "$total_questions"] }, 100] }
                }
            }
        ]);

        if (!resultData.length) {
            return res.status(404).json({ message: "No answers found for this quiz" });
        }

        const { total_questions, correct_answers, incorrect_answers, score_percentage } = resultData[0];

        // Save result in the database
        const result = new Result({
            user_id,
            quiz_id,
            total_questions,
            correct_answers,
            incorrect_answers,
            score_percentage
        });

        await result.save();

        res.status(200).json({
            message: "Quiz result calculated successfully!",
            total_questions,
            correct_answers,
            incorrect_answers,
            score_percentage
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Get User's Result
exports.getResult = async (req, res) => {
    try {
        const { user_id, quiz_id } = req.params;

        const result = await Result.aggregate([
            { $match: { user_id: new mongoose.Types.ObjectId(user_id), quiz_id: new mongoose.Types.ObjectId(quiz_id) } },
            {
                $project: {
                    _id: 1,
                    total_questions: 1,
                    correct_answers: 1,
                    incorrect_answers: 1,
                    score_percentage: 1,
                    created_at: 1
                }
            }
        ]);

        if (!result.length) {
            return res.status(404).json({ message: "No results found" });
        }

        res.status(200).json(result[0]);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};