//jshint esversion:6

const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const _ = require('lodash');
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true, useUnifiedTopology: true});

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const postSchema = {
  postTitle: String,
  postAuthor: String,
  postContent: String
};

const Post = mongoose.model("Post", postSchema);

const defaultBlog = new Post ({
  postTitle: "Welcome",
  postAuthor: "Dragon Networks",
  postContent: "Hey there! Click on the compose button above to write a blog, or checkout some of the recent blogs written by other people."
});

app.get("/", function(req, res) {
  Post.find({}, function(err, posts){
    res.render("home", {posts: posts});
  });
});

app.post("/", function(req, res) {
  if (req.body.home === "Compose") {
    res.redirect("/compose");
  } else if (req.body.home === "About") {
    res.redirect("/about");
  } else if (req.body.home === "Contact") {
    res.redirect("/contact");
  } else {
    res.redirect("/");
  }
});

app.get("/compose", function(req, res) {
  res.render("compose");
});

app.post("/compose", function(req, res) {
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

app.get("/about", function(req, res) {
  res.render("about");
});

app.get("/contact", function(req, res) {
  res.render("contact");
});

app.get("/posts/:postId", function(req, res) {
  const reqPostId = req.params.postId;

  Post.findOne({_id: reqPostId}, function(err, post) {
    res.render("post", {
      title: post.postTitle,
      author: post.postAuthor,
      content: post.postContent
    });
  });
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
