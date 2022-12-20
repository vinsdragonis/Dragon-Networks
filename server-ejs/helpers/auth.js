const jwt=require('jsonwebtoken');
// const {User}=require('../models/user');

function generateAuthToken(user)
{
    const secret = 'ipl-rcb-virat';
    const token = jwt.sign(
        {
            userName: user.username,
            userEmail:user.email
        },
        secret,
        { expiresIn: '1d' }
    );
    return token;
}

module.exports=generateAuthToken;