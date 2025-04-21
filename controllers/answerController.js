const mongoose = require("mongoose");
const Answer = require("../models/answerModel");
const Question = require("../models/questionModel");

//Submit User Answer
exports.submitAnswer = async (req, res) => {
    try {
        const { user_id, quiz_id, question_id, selected_option } = req.body;

        // Check if the question exists
        const question = await Question.findById(question_id);
        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        // Store answer
        const answer = new Answer({
            user_id,
            quiz_id,
            question_id,
            selected_option
        });

        await answer.save();
        res.status(200).json({ message: "Answer submitted successfully!" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Get User's Answers (with Aggregation)
exports.getUserAnswers = async (req, res) => {
    try {
        const { user_id, quiz_id } = req.params;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(user_id) || !mongoose.Types.ObjectId.isValid(quiz_id)) {
            return res.status(400).json({ message: "Invalid user_id or quiz_id" });
        }

        console.log("User ID:", user_id);
        console.log("Quiz ID:", quiz_id);

        const answers = await Answer.aggregate([
            { 
                $match: { 
                    user_id: new mongoose.Types.ObjectId(user_id), 
                    quiz_id: new mongoose.Types.ObjectId(quiz_id) 
                } 
            },
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
                    "questionDetails.question_text": 1,
                    selected_option: 1
                }
            }
        ]);

        if (!answers.length) {
            return res.status(404).json({ message: "No answers found for this quiz" });
        }

        res.status(200).json(answers);
    } catch (error) {
        console.error("Error fetching answers:", error);
        res.status(500).json({ error: error.message });
    }
};