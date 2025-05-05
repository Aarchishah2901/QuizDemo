const Answer = require("../models/answerModel");
const Result = require("../models/resultModel");
const Quiz = require("../models/quizModel");

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

  console.log("Received userId:", userId);
  console.log("Received quizId:", quizId);

  if (!userId || !quizId) {
    return res.status(400).json({ message: "userId and quizId are required" });
  }

  try {
    const result = await Result.findOne({ userId, quizId });

    if (!result) {
      return res.status(404).json({ message: "Result not found" });
    }

    res.status(200).json({
      totalQuestions: result.totalQuestions,
      correctAnswers: result.correctAnswers,
      wrongAnswers: result.wrongAnswers,
      score: result.score,
    });
  } catch (err) {
    console.error("Error fetching result:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// exports.getUserQuizHistory = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     if (!userId) {
//       return res.status(400).json({ message: "User ID is required" });
//     }

//     const history = await Result.find({ userId })
//     .populate({
//       path: "quizId",
//       select: "quiztype_name",
//       match: { _id: { $ne: null } }
//     })
//   .sort({ createdAt: -1 });

//     if (!history || history.length === 0) {
//       return res.status(404).json({ message: "No quiz history found" });
//     }

//     history.forEach(result => {
//       if (!result.quizId) {
//         console.log(`No quiz found for result with ID: ${result._id}`);
//       }
//     });

//     res.status(200).json(history);
//   } catch (error) {
//     console.error("Error in getQuizHistory:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

exports.getUserQuizHistory = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const history = await Result.find({ userId })
      .populate("quizId", "quiztype_name") // make sure this matches your model
      .sort({ createdAt: -1 });

    if (!history || history.length === 0) {
      return res.status(404).json({ message: "No quiz history found" });
    }

    res.status(200).json(history);
  } catch (error) {
    console.error("Error in getQuizHistory:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};