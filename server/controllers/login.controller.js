const { getUserByUsernameQuery } = require("../repository/user.repository");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../passport/auth');
const getUserByUsername = async (req, res) => {
  try {
    const {username, password} = req.body;

    const user = await getUserByUsernameQuery(username);

    if (!user){
        return res.status(400).json({ message: "user doesn't exist" });
    }

    const match = await bcrypt.compare(password, user.Password);

    if (match) {

      console.log(user);
      jwt.sign(
          { username: user.Username },
          process.env.SECRET,
          { algorithm:'HS256',
                    expiresIn: '1h'},
          function (err, token) {
            if (err) {
              throw err;
            }
            res.cookie('token', token);
            res.status(200).json({ token, user });
          }
      );

    }

    else {
        res.status(401).json({ message: 'User not authorized' });
    } 
  } catch (err) {
    res.status(500).json({ message: 'Error on server side' });
  }
};

const checkIfLogged = async (req, res, next) => {

    console.log('checkIfLogged');
    let token = req.headers.authorization;

    if (!token){
        return next();
    }

    token = token.split(" ")[1];
    console.log(token);
    try {
        const user = await auth(token);

        if (user){
            return res.status(200).json({message: 'You are already logged in'}, user);
        }
        else {
            next();
        }
    }
    catch (err){
        console.log(err);
        next();
    }

};

module.exports = { getUserByUsername, checkIfLogged };
