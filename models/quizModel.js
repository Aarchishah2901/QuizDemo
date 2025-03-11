// const mongoose = require('mongoose');

// const quizSchema = new mongoose.Schema({
//     user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
//     quiztype_name: { type: mongoose.Schema.Types.ObjectId, ref: "QuizType", required: true},
//     question_id: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
//     answer_id: { type: mongoose.Schema.Types.ObjectId, ref: "Answer" },
//     result_id: { type: mongoose.Schema.Types.ObjectId, ref: "Result" }
// }, { timestamps: true });

// module.exports = mongoose.model("Quiz", quizSchema);

const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        questions: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Question",
            },
        ],
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Quiz", quizSchema);