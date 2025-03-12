const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("Authorization Header:", authHeader); // Debugging line

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];
    console.log("Extracted Token:", token); // Debugging line

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded User:", decoded); // Debugging line

        req.user = decoded; // Attach full user info to request
        next();
    } catch (error) {
        console.error("Token Verification Error:", error); // Debugging line
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};

module.exports = authMiddleware;