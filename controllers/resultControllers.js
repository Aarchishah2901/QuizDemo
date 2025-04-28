const Answer = require("../models/answerModel");
const Result = require("../models/resultModel");

exports.calculateResult = async (req, res) => {
  try {
    const { userId, quizId } = req.body;
    const answers = await Answer.find({ userId, quizId });

    if (!answers.length) {
      return res.status(404).json({ message: "No answers found for this quiz." });
    }

    const correctAnswers = answers.filter(a => a.isCorrect).length;
    const totalQuestions = answers.length;
    const wrongAnswers = totalQuestions - correctAnswers;
    const score = correctAnswers;
    const result = new Result({
      userId,
      quizId,
      totalQuestions,
      correctAnswers,
      wrongAnswers,
      score
    });

    await result.save();

    res.status(200).json({
      message: "Quiz result calculated successfully",
      result
    });
  } catch (error) {
    res.status(500).json({ message: "Error calculating result", error });
  }
};

exports.getResult = async (req, res) => {
  const { userId, quizId } = req.params;

  console.log("Received userId:", userId);  // Debugging log
  console.log("Received quizId:", quizId);  // Debugging log

  if (!userId || !quizId) {
    return res.status(400).json({ message: "userId and quizId are required" });
  }

  try {
    const result = await Result.findOne({ userId, quizId });

    if (!result) {
      return res.status(404).json({ message: "Result not found" });
    }

    res.status(200).json({ result });
  } catch (err) {
    console.error("Error fetching result:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};