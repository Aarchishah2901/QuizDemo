const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    quiz_id: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
    question_id: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
    selected_option: { type: String, required: true } // User's selected answer
}, { timestamps: true });

module.exports = mongoose.model("Answer", AnswerSchema);