const Role = require('../models/roleModel');
const User = require('../models/User');

exports.createRole = async (req, res) => {
    try {
        const { role_type, permissions } = req.body;

        const roleExists = await Role.findOne({ role_type });
        if (roleExists) {
            return res.status(400).json({ error: "Role already exists" });
        }

        const newRole = new Role({ role_type, permissions });
        await newRole.save();
        res.status(201).json({ message: "Role created successfully", role: newRole });
    } catch (error) {
        console.error("Error creating role:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.getRolesWithPermissions = async (req, res) => {
    try {
        const roles = await Role.aggregate([
            {
                $project: {
                    _id: 1,
                    name: 1,
                    permissions: 1
                }
            }
        ]);
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllRoles = async (req, res) => {
    try {
        const roles = await Role.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "role_id",
                    as: "users_with_role"
                }
            },
            {
                $project: {
                    role_type: 1,
                    permissions: 1,
                    user_count: { $size: "$users_with_role" }
                }
            }
        ]);

        res.status(200).json(roles);
    } catch (error) {
        console.error("Error fetching roles:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.assignRole = async (req, res) => {
    try {
        const { userId, roleId } = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        const role = await Role.findById(roleId);
        if (!role) return res.status(404).json({ error: "Role not found" });

        user.role_id = roleId;
        await user.save();

        res.status(200).json({ message: "Role assigned successfully", user });
    } catch (error) {
        console.error("Error assigning role:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.deleteRole = async (req, res) => {
    try {
        const { roleId } = req.params;

        const role = await Role.findByIdAndDelete(roleId);
        if (!role) return res.status(404).json({ error: "Role not found" });

        res.status(200).json({ message: "Role deleted successfully" });
    } catch (error) {
        console.error("Error deleting role:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};