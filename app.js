//jshint esversion:6

const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const _ = require('lodash');
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

const defaultBlog = ({
  postTitle: "Welcome",
  postAuthor: "Dragon Networks",
  postContent: "Hey there! Click on the compose button above to write a blog, or checkout some of the recent blogs written by other people."
});

mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true, useUnifiedTopology: true});

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  Post.find({}, function(err, foundPosts){
    if (!err) {
      if (foundPosts.length === 0) {
        Post.insertOne(defaultBlog, function() {
          if (err) {
            console.log(err);
          } else {
            console.log("Successfully added default blog!");
          }
          res.redirect("/");
        });
      } else {
        res.render("home", {posts: posts});
      }
    }
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
  const blog = new Post {
    postTitle: req.body.postTitle,
    postAuthor: req.body.postAuthor,
    postContent: req.body.postContent
  };

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

app.get("/posts/:postName/", function(req, res) {
  const reqTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post) {
    const storedTitle = _.lowerCase(post.postTitle);

    if (storedTitle === reqTitle) {
      res.render("post", {
        title: post.postTitle,
        author: post.postAuthor,
        content: post.postContent
      });
    }
  });
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
