const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    question_id: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
    correct_answer: { type: String, required: true },
    wrong_answers: [{ type: String }],
    attempted_answer: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Answer", answerSchema);