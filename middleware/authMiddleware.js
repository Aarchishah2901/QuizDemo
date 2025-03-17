const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Role = require('../models/roleModel');
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

const verifyToken = async (req, res, next) =>{
    const token = req.header("Authorization")?.split(' ')[1];
    if (!token)
    {
        console.log("No token provided");
        return res.status(401).json({ error: "Access denied, no token provided "});
    }
    try
    {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token", decoded);
        
        const user = await User.findById(decoded.id);
        console.log("Found user", user);
        

        if (!user)
        {
            console.log("Token verification failed", error);
            return res.status(403).json({ error: "User not found" });
        }

        req.user = user;
        next();
    }
    catch (error)
    {
        console.log("Token verification failed", error);
        
        res.status(403).json({ error: "Invalid token" });
    }
};

const checkRole = (allowedRoles) => {
    return async (req, res, next) => {
        try
        {
            const user = await User.findById(req.user.id).populate("role_id");
            if (!user)
                return res.status(404).json({ error: "User not found" });

            if (!allowedRoles.includes(user.role_id.role_type))
            {
                return res.status(403).json({ error: "Access denied" });
            }

            next();
        }
        catch (error)
        {
            console.log("Authorization error:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    };
};

module.exports = { verifyToken, checkRole, authMiddleware };