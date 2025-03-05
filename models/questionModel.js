const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question_text: String,
    quiztype_id: { type: mongoose.Schema.Types.ObjectId, ref: "QuizType" }
});

module.exports = mongoose.model("Question", questionSchema);