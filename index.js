const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
require("./models/User");
const passport = require("passport");
require("./config/passport");
const authRoutes = require("./routes/auth");
const connect = require('./connect');

// Initialize Express App
const app = express();
connect();
app.use(express.json());
app.use(passport.initialize());

app.get("/", (req,res) => {
    res.send("API is running.....");
})

// Routes
app.use('/api/auth', authRoutes);

// Protected Route
app.get('/api/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ message: 'You accessed a protected route!', user: req.user });
});

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/QuizDatabase";

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected Successfully!"))
.catch((err) => {
    console.error("❌ MongoDB Connection Failed:", err);
    process.exit(1);
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));