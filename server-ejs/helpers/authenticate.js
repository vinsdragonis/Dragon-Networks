const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

const authenticate = (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        const secret = 'ipl-rcb-virat';
        jwt.verify(token, secret, async (err, decodedToken) => {
            if (err) {
                res.redirect('/auth/register');
            }
            else {
                const rootUser = await User.find({username:decodedToken.userName,email:decodedToken.userEmail});
                if (!rootUser) { 
                    res.redirect('/auth/register'); 
                }
                req.token = token;
                req.rootUser = rootUser;
                next();
            }
        });
    }
    catch (err) {
        // res.status(401).send('Unauthorized:no token provided');
        res.redirect('/auth/register');
    }
}

module.exports = authenticate;