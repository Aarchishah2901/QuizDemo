const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
  questionId: {type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
  selectedOption: { type: String, required: true },
  isCorrect: { type: Boolean, required: true },
  locked: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("Answer", answerSchema);