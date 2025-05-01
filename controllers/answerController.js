const Answer = require("../models/answerModel");
const Question = require("../models/questionModel");

exports.submitAnswers = async (req, res) => {
  const { userId, quizId, answers } = req.body;
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
  
        const isCorrect = question.correct_answer === ans.selectedOption;
        console.log(`Selected: ${ans.selectedOption}, Correct: ${question.correct_answer}, isCorrect: ${isCorrect}`);
  
        answerDocs.push({
          userId,
          quizId,
          questionId: ans.questionId,
          selectedOption: ans.selectedOption,
          isCorrect,
        });
      }

      console.log("Answer docs to insert:", answerDocs);
      await Answer.insertMany(answerDocs);
      res.status(200).json({ message: "Answers submitted successfully" });
      answers: answerDocs;
    } catch (error) {
      console.error("Error submitting answers:", error);
      res.status(500).json({ message: "Error submitting answers", error });
    }
  };