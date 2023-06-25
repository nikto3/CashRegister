// const { getuserByUsernameQuery } = require("../repository/user.repository");
// const passport = require("passport");
// const jwt = require('jsonwebtoken');
const auth = require('../passport/auth');

const requestAuth = async (req, res, next) => {

    console.log('requestAuth');
    let token = req.headers.authorization;

    if (!token){
        res.status(401).json({ message: 'User is not logged in' });
    }

    token = token.split(" ")[1];
    console.log(token);
    try {
        const user = await auth(token);

        if (user){
            next();
        }
        else {
            res.status(401).json({ message: 'User not recognized' })
        }
    }
    catch (err){
        console.log(err);
        res.status(500).end();
    }

};

module.exports = { requestAuth }