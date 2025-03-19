const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    role_id: mongoose.Schema.Types.ObjectId,
    role_type: { type: String, required: true, unique: true },
    permissions: { type: [String], required: true }
});

module.exports = mongoose.model('Role', RoleSchema);