const mongoose = require('mongoose');

const quizTypeSchema = new mongoose.Schema({
    quiztype_name: { type: String, required: true, unique: true}
}, { timestamps: true});

module.exports = mongoose.model("QuizType", quizTypeSchema);