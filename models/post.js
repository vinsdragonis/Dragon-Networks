const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const postSchema = new mongoose.Schema({
    postTitle: String,
    postAuthor: String,
    postContent: String
});

const Post = mongoose.model("Post", postSchema);

module.exports.Post = Post;