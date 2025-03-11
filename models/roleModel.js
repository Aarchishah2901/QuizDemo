const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema
//     role_type: { type: String, required: true, unique: true }
// }, { timestamps: true });
({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    permissions: {
        type: [String], // Example: ["create_quiz", "manage_users"]
        default: [],
    },
},
{ timestamps: true });

module.exports = mongoose.model("Role", roleSchema);