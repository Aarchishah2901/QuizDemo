const mongoose = require("mongoose");

const ResultSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    quiz_id: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
    total_questions: { type: Number, required: true },
    correct_answers: { type: Number, required: true },
    incorrect_answers: { type: Number, required: true },
    score_percentage: { type: Number, required: true } // Calculated score
}, { timestamps: true });

module.exports = mongoose.model("Result", ResultSchema);