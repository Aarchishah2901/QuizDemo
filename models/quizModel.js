const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    quiztype_name: { type: mongoose.Schema.Types.ObjectId, ref: "QuizType" },
    question_id: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
    answer_id: { type: mongoose.Schema.Types.ObjectId, ref: "Answer" },
    result_id: { type: mongoose.Schema.Types.ObjectId, ref: "Result" }
});

module.exports = mongoose.model("Quiz", quizSchema);