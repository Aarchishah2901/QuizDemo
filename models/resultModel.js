// const mongoose = require('mongoose');

// const resultSchema = new mongoose.Schema({
//     user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     question_id: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
//     total_mark: Number
// }, { timestamps: true });

// module.exports = mongoose.model("Result", resultSchema);

const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        quiz_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Quiz",
            required: true,
        },
        score: {
            type: Number,
            required: true,
        },
        total_questions: {
            type: Number,
            required: true,
        },
        correct_answers: {
            type: Number,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Result", resultSchema);