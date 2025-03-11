const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    question_id: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
    answer_text: { type: String , required: true },
    correct_answer: { type: Boolean, required: true },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model("Answer", answerSchema);