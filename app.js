//jshint esversion:6

const express = require("express");
const app = express();
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require("mongoose");
const cookieParser=require('cookie-parser');
const {Post}=require('./models/post');

app.set('view engine', 'ejs');

// mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true, useUnifiedTopology: true})
// .then(() => console.log('Connected to mongodb'))
// .catch(() => console.log('Could not connect to mongodb'));

mongoose.connect('mongodb://localhost/users', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Connected to mongodb'))
.catch(() => console.log('Could not connect to mongodb'));

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(__dirname+'/public'));


app.use('/auth',require('./routers/users'));
app.use('/',require('./routers/home'));
app.use('/compose',require('./routers/compose'));
app.use('/about',require('./routers/about'));
app.use('/contact',require('./routers/contact'));

// const defaultBlog = new Post ({
//   postTitle: "Welcome",
//   postAuthor: "Dragon Networks",
//   postContent: "Hey there! Click on the compose button above to write a blog, or checkout some of the recent blogs written by other people."
// });

app.get("/posts/:postId", function(req, res) {
  const reqPostId = req.params.postId;

  Post.findOne({_id: reqPostId}, function(err, post) {
    if (err)
    {
      console.log(err);
    }
    else
    {
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
