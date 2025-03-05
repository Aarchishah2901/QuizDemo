const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    role_type: { type: String, required: true }
});

module.exports = mongoose.model("Role", roleSchema);