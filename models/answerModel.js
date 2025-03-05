const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    question_id: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
    correctanswer: String,
    wronganswer: [String],
    attemptanswer: String
});

module.exports = mongoose.model("Answer", answerSchema);