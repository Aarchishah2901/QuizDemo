const Answer = require("../models/answerModel");
const Question = require("../models/questionModel");
const Result = require("../models/resultModel");

// exports.submitAnswers = async (req, res) => {
//   const { userId, quizId, answers } = req.body;
//   if (!userId || !quizId || !Array.isArray(answers)) {
//     return res.status(400).json({ error: 'Invalid request payload' });
//   }
//     try {
//       console.log("Received data:", req.body);
  
//       const answerDocs = [];
  
//       for (const ans of answers) {
//         const question = await Question.findById(ans.questionId);
//         console.log(`Question found for ID ${ans.questionId}:`, question);
  
//         if (!question) {
//           return res.status(404).json({
//             message: `Question with ID ${ans.questionId} not found`,
//           });
//         }
  
//         const isCorrect = question.correct_answer === ans.selectedOption;
//         console.log(`Selected: ${ans.selectedOption}, Correct: ${question.correct_answer}, isCorrect: ${isCorrect}`);
  
//         answerDocs.push({
//           userId,
//           quizId,
//           questionId: ans.questionId,
//           selectedOption: ans.selectedOption,
//           isCorrect,
//         });
//       }

//       console.log("Answer docs to insert:", answerDocs);
//       await Answer.insertMany(answerDocs);
//       res.status(200).json({ message: "Answers submitted successfully" });
//       answers: answerDocs;
//     } catch (error) {
//       console.error("Error submitting answers:", error);
//       res.status(500).json({ message: "Error submitting answers", error });
//     }
//   };

exports.submitAnswers = async (req, res) => {
  const { userId, quizId, answers } = req.body;

  // Validate the input
  if (!userId || !quizId || !Array.isArray(answers)) {
    return res.status(400).json({ error: 'Invalid request payload' });
  }

  try {
    console.log("Received data:", req.body);

    const answerDocs = [];

    for (const ans of answers) {
      const question = await Question.findById(ans.questionId);
      console.log(`Question found for ID ${ans.questionId}:`, question);

      if (!question) {
        return res.status(404).json({
          message: `Question with ID ${ans.questionId} not found`,
        });
      }

      // Check if the user has already answered the question and if the answer is locked
      const existingAnswer = await Answer.findOne({ userId, quizId, questionId: ans.questionId });

      if (existingAnswer && existingAnswer.locked) {
        // If the answer is locked, prevent the user from modifying it
        return res.status(400).json({
          message: `You have already answered question ${ans.questionId}, and your answer is locked.`,
        });
      }

      // Determine if the selected answer is correct
      const isCorrect = question.correct_answer === ans.selectedOption;
      console.log(`Selected: ${ans.selectedOption}, Correct: ${question.correct_answer}, isCorrect: ${isCorrect}`);

      answerDocs.push({
        userId,
        quizId,
        questionId: ans.questionId,
        selectedOption: ans.selectedOption,
        isCorrect,
        locked: true, // Lock the answer after submission
      });
    }

    console.log("Answer docs to insert:", answerDocs);

    // Insert the new answers into the database
    await Answer.insertMany(answerDocs);

    res.status(200).json({ message: "Answers submitted successfully" });
  } catch (error) {
    console.error("Error submitting answers:", error);
    res.status(500).json({ message: "Error submitting answers", error });
  }
};