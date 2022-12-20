const { Post } = require('../models/post');
const express = require('express');
const router = express.Router();

router.get("/", function (req, res) {
    Post.find({}, function (err, posts) {
        res.render("home", { posts: posts });
    });
});

module.exports=router;