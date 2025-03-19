const User = require('../models/User');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

exports.getAllUsers = async (req, res) => {

    try
    {
        const users = await User.aggregate([
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
                    phone_no: 1,
                    gender: 1,
                    role: "$roleDetails.role_type",
                    permissions: "$roleDetails.permissions",
                    createdAt: 1
                }
            }
        ]).option({ strictPopulate: false });
        
        res.status(200).json(users);
    }
    catch (error)
    {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.getUserById = async (req, res) => {

    try
    {
        const userId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(userId))
        {
            return res.status(400).json({ error: 'Invalid user ID format' });
        }

        const user = await User.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(userId) } },
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
                    phone_no: 1,
                    gender: 1,
                    role: "$roleDetails.role_type",
                    permissions: "$roleDetails.permissions",
                    createdAt: 1
                }
            }
        ]);

        if (!user.length)
        {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user[0]);
    }
    catch (error)
    {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.updateUser = async (req, res) => {
    try
    {
        const userId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(userId))
        {
            return res.status(400).json({ error: 'Invalid user ID format' });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: req.body },
            { new: true, runValidators: true }
        );

        if (!updatedUser)
        {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    }
    catch (error)
    {
        console.error("Update error:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deleteUser = async (req, res) => {
    console.log("delete");
    try
    {
        const userId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(userId))
        {
            console.log(user);
            
            return res.status(400).json({ error: 'Invalid user ID format' });
        }

        const user = await User.findByIdAndDelete(userId);
        if (!user)
        {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    }
    catch (error)
    {
        console.error("Delete error:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};