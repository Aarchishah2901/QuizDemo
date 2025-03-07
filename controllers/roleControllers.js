const Role = require("../models/roleModel");

exports.createRole = async (req, res) => {
    try
    {
        const { role_type } = req.body();
        const newRole = new Role ({ role_type });
        await newRole.save();
        res.status(201).json(newRole);
    }
    catch (error)
    {
        res.status(500).json({ error: error.message });
    }
};

exports.getRoles = async (req, res) => {
    try
    {
        const roles = await Role.find();
        res.status(200).json(roles);
    }
    catch (error)
    {
        res.status(500).json({ error: error.message });
    }
};