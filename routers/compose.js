const { Post } = require('../models/post');
const express = require('express');
const authenticate=require('../helpers/authenticate');
const router = express.Router();

router.get("/", authenticate,function(req, res) {
    res.render("compose");
  });
  
router.post("/", function(req, res) {
    const post = new Post ({
      postTitle: req.body.postTitle,
      postAuthor: req.body.postAuthor,
      postContent: req.body.postContent
    });
  
    post.save(function(err){
      if (!err){
          res.redirect("/");
      }
    });
  });

module.exports=router;