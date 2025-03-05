const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    question_id: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
    total_mark: Number
}, { timestamps: true });

module.exports = mongoose.model("Result", resultSchema);