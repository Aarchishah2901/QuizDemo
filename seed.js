const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const Role = require("./models/roleModel");
const User = require("./models/User");
const QuizType = require("./models/quizTypeModel");
const Question = require("./models/questionModel");
const Answer = require("./models/answerModel");
const Quiz = require("./models/quizModel");
const Result = require("./models/resultModel");

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/QuizDatabase";

mongoose.connect(MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected Successfully!"))
    .catch(err => {
        console.error("❌ MongoDB Connection Failed:", err);
        process.exit(1);
    });

const seedDatabase = async () => {
    try {
        console.log("Deleting existing data...");

        await Role.deleteMany({});
        await User.deleteMany({});
        await QuizType.deleteMany({});
        await Question.deleteMany({});
        await Answer.deleteMany({});
        await Quiz.deleteMany({});
        await Result.deleteMany({});

        console.log("✅ Old data deleted successfully!");

        const roles = await Role.insertMany([
            { role_type: "Admin" },
            { role_type: "User" }
        ]);

        const users = await User.insertMany([
            {
                firstname: "John",
                lastname: "Doe",
                phone_no: 1234567890,
                email: "john.doe@example.com",
                gender: "Male",
                password: "hashed_password",
                role_id: roles[1]._id // Assign role 'User'
            }
        ]);

        const quizTypes = await QuizType.insertMany([
            { quiztype_name: "Math" },
            { quiztype_name: "Science" }
        ]);

        const questions = await Question.insertMany([
            {
                question_text: "What is 2+2?",
                quiztype_id: quizTypes[0]._id // Math
            }
        ]);

        const answers = await Answer.insertMany([
            {
                question_id: questions[0]._id,
                correctanswer: "4",
                wronganswer: ["1", "3", "5"],
                attemptanswer: "4"
            }
        ]);

        const quizzes = await Quiz.insertMany([
            {
                user_id: users[0]._id,
                quiztype_name: quizTypes[0]._id,
                question_id: questions[0]._id,
                answer_id: answers[0]._id
            }
        ]);

        await Result.insertMany([
            {
                user_id: users[0]._id,
                question_id: questions[0]._id,
                total_mark: 10
            }
        ]);

        console.log("✅ Database Seeded Successfully!");
    } catch (error) {
        console.error("❌ Seeding Failed:", error);
    } finally {
        mongoose.connection.close();
    }
};

seedDatabase();