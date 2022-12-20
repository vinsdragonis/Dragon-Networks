const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        profilePic: {
            type: String,
            default: "https://cdn-icons-png.flaticon.com/512/924/924874.png",
        },
        qualification: {
            type: String,
            required: true,
        },
        occupation: {
            type: String,
            required: true,
        },
        experience: {
            type: [{
                type: String,
                default: "No experience"
            }],
        },
        connections: {
            type: [{
                type: String,
            }],
            required: true,
            default: [],
        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', UserSchema);