const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    passwordHash: String
});

const User = mongoose.model('User', userSchema);

module.exports.User = User;