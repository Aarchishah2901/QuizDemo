const express = require("express");
const passport = require("passport");
const dotenv = require("dotenv");
const connectDB = require("./connect");
const authRoutes = require("./routes/auth");
const path = require('path');

// Load environment variables
dotenv.config();

// Initialize Express App
const app = express();
connectDB();

// Middleware
app.use(express.json());
app.use(passport.initialize());
require("./config/passport");

// Routes
app.use('/api/auth', authRoutes);

app.get("/", (req, res) => {
  res.send("API is running.....");
});

// Protected Route Example
app.get('/api/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ message: 'You accessed a protected route!', user: req.user });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));