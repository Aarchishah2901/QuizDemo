const User = require("../models/User");
const Role = require("../models/roleModel");

const checkPermission = (requiredPermission) => async (req, res, next) => {
    try {
        const user = await User.aggregate([
            { $match: { _id: req.user.id } },
            {
                $lookup: {
                    from: "roles",
                    localField: "role",
                    foreignField: "_id",
                    as: "roleDetails"
                }
            },
            { $unwind: "$roleDetails" },
            {
                $project: {
                    _id: 1,
                    firstname: 1,
                    lastname: 1,
                    email: 1,
                    role: "$roleDetails.name",
                    permissions: "$roleDetails.permissions"
                }
            }
        ]);

        if (!user.length) return res.status(403).json({ error: "User not found" });

        const userData = user[0];

        if (!userData.permissions.includes(requiredPermission)) {
            return res.status(403).json({ error: "Access denied: Insufficient permissions" });
        }

        req.user = userData;
        next();
    } catch (error) {
        console.error("Permission Check Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = checkPermission;