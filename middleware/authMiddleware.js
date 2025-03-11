const passport = require('passport');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// authMiddleware = passport.authenticate('jwt', { session: false });
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];
    console.log(token);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure JWT_SECRET is set in .env
        req.user = decoded; // Attach decoded user info to request
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    
};

module.exports = authMiddleware;