const {User} = require('../models/user');
const express = require('express');
const bcrypt = require('bcryptjs');
const generateAuthToken=require('../helpers/auth');
const authenticate=require('../helpers/authenticate');
const router = express.Router();
let user=null;

router.get('/users', (req, res) => {
    User.find().select('username email')
        .then((users) => {
            if (users) {
                return res.status(200).json(users);
            }
            else {
                return res.status(404).json({ success: false });
            }
        })
        .catch((ex) => {
            return res.status(500).json({ success: false });
        });
});

// router.get('/home',(req,res)=>
// {
//     res.render('home',
//     {
//         user:user
//     });
// });

// router.get('/about',authenticate,(req,res)=>
// {
//     user=req.rootUser;
//     res.render('about');
// });

router.get('/register',(req,res)=>
{-
    res.render('sign_up');
});

router.get('/login',(req,res)=>
{
    res.render('sign_in');
});

router.get('/logout',(req,res)=>
{
    user=null;
    res.clearCookie('jwt');
    res.redirect('home');
});

router.post('/register', (req, res) => {
    User.findOne({ username: req.body.username })
        .then((username) => {
            if (username) {
                res.status(400).json({ message: "User already exists!" });
            }
            const user = new User({
                username: req.body.username,
                email: req.body.email,
                passwordHash: bcrypt.hashSync(req.body.password, 10)
            });
            user.save()
                .then((user) => {
                    if (user) {
                        const token=generateAuthToken(user);
                        res.cookie('jwt',token,{httpOnly:true,maxAge:24*60*60*1000});
                        res.status(200).json({ message: "User registered successfully!" });
                    }
                    else {
                        res.status(400).json({ message: "Bad request!" });
                    }
                })
                .catch((ex) => {
                    res.status(500).json({ message: "Internal server error while registering the user!" });
                });
        })
        .catch((ex) => {
            res.status(500).json({ message: ex.message});
        });
});

router.post('/login',(req, res) => {
    User.findOne({ username: req.body.username })
        .then((user) => {
            if (!user) {
                return res.status(404).json({message:'User with the given mail id not found'});
            }
            else if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
                const token=generateAuthToken(user);
                res.cookie('jwt',token,{httpOnly:true,maxAge:24*60*60*1000});
                return res.status(200).json({message:'User logged in successfully'});
            }
            else {
                return res.status(400).json({message:'Password is wrong!'});
            }
        })
        .catch((ex) => {
            return res.status(500).send('Internal server error');
        });
});

module.exports = router;