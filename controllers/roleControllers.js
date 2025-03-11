const Role = require("../models/roleModel");

// exports.createRole = async (req, res) => {
//     try
//     {
//         const { role_type } = req.body();
//         if (!role_type) {
//             return res.status(400).json({ message: "Role type is required" });
//         }

//         const existingRole = await Role.findOne({ role_type });
//         if (existingRole) {
//             return res.status(400).json({ message: "Role already exists" });
//         }

//         const newRole = new Role({ role_type });
//         await newRole.save();

//         res.status(201).json({ message: "Role created successfully", role: newRole });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// exports.getRoles = async (req, res) => {
//     try
//     {
//         const roles = await Role.find();
//         res.status(200).json(roles);
//     }
//     catch (error)
//     {
//         res.status(500).json({ error: error.message });
//     }
// };

// exports.getRoleById = async (req, res) => {
//     try
//     {
//         const role = await Role.findById(req.params.id);
//         if (!role)
//         {
//             return res.status(404).json({ message: "Role not found" });
//         }
//         res.status(200).json(role);
//     }
//     catch (error)
//     {
//         res.status(500).json({ error: error.message });
//     }
// };

// exports.updateRole = async (req, res) => {
//     try
//     {
//         const { role_type } = req.body;
//         if (!role_type)
//         {
//             return res.status(400).json({ message: "Role type is required" });
//         }
//         const updatedRole = await Role.findByIdAndUpdate(
//             req.params.id,
//             { role_type },
//             { new: true, runValidators: true }
//         );
//         if( !updatedRole)
//         {
//             return res.status(404).json({ message: "Role not found" });
//         }
//         res.status(200).json({ message: "Role updated successfully", role: updatedRole });
//     }
//     catch (error)
//     {
//         res.status(500).json({ error: error.message });
//     }
// };

// exports.deleteRole = async (req, res) => {
//     try
//     {
//         const deletedRole = await Role.findByIdAndDelete(req.params.id);
//         if (!deletedRole)
//         {
//             return res.status(404).json({ message: "Role not found" });
//         }
//         res.status(200).json({ message: "Role deleted successfully" });
//     }
//     catch (error)
//     {
//         res.status(500).json({ error: error.message });
//     }
// }

exports.createRole = async (req, res) => {
    try {
        const { name, permissions } = req.body;

        const newRole = new Role({ name, permissions });
        await newRole.save();
        res.status(201).json(newRole);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllRoles = async (req, res) => {
    try {
        const roles = await Role.find();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getRoleById = async (req, res) => {
    try {
        const role = await Role.findById(req.params.roleID);
        if (!role) return res.status(404).json({ message: "Role not found" });

        res.status(200).json(role);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateRole = async (req, res) => {
    try {
        const updatedRole = await Role.findByIdAndUpdate(req.params.roleID, req.body, { new: true });
        if (!updatedRole) return res.status(404).json({ message: "Role not found" });

        res.status(200).json(updatedRole);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteRole = async (req, res) => {
    try {
        const role = await Role.findByIdAndDelete(req.params.roleID);
        if (!role) return res.status(404).json({ message: "Role not found" });

        res.status(200).json({ message: "Role deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};