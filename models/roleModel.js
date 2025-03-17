const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    role_type: { type: String, required: true, unique: true },
    permissions: { type: [String], required: true }
});

module.exports = mongoose.model('Role', RoleSchema);