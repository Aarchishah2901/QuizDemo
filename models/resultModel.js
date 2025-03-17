const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    quiztype_name: { type: String, required: true },
    total_questions: { type: Number, required: true },
    correct_answers: { type: Number, required: true },
    incorrect_answers: { type: Number, required: true },
    answers: [
        {
            question_id: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
            question_text: { type: String },
            selected_answer: { type: String },
            correct_answer: { type: String },
            isCorrect: { type: Boolean }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model("Result", resultSchema);