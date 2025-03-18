const mongoose = require("mongoose");
const User = require("../models/User");
const Role = require("../models/roleModel");

const checkPermission = (requiredPermission) => async (req, res, next) => {
    try
    {
        if (!req.user || !req.user.id)
        {
            return res.status(401).json({ error: "Unauthorized: No user found in request" });
        }

        const user = await User.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(req.user.id) } },
            {
                $lookup:
                {
                    from: "roles",
                    localField: "role_id",
                    foreignField: "_id",
                    as: "roleDetails"
                }
            },
            { $unwind: "$roleDetails" },
            {
                $project:
                {
                    _id: 1,
                    firstname: 1,
                    lastname: 1,
                    email: 1,
                    role: "$roleDetails.role_type",
                    permissions: "$roleDetails.permissions"
                }
            }
        ]);

        if (!user.length)
        {
            console.log(user);
            return res.status(403).json({ error: "User not found or has no role assigned" });
        }

        const userData = user[0];

        if (!userData.permissions.includes(requiredPermission))
        {
            return res.status(403).json({ error: "Access denied: Insufficient permissions" });
        }

        req.user = userData;
        next();
    }
    catch (error)
    {
        console.error("Permission Check Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = checkPermission;