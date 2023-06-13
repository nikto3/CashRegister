const { getWaiterByUsernameQuery } = require("../repository/waiter.repository");
const passport = require("passport");
const jwt = require('jsonwebtoken');
const auth = require('../passport/auth');
const getWaiterByUsername = async (req, res) => {
  try {
    const username = req.body.username;

    const waiter = await getWaiterByUsernameQuery(username);

    console.log('Metoda getWaiterByID');


    if (waiter) {

      console.log(waiter);
      jwt.sign(
          { username: waiter.Username },
          process.env.SECRET,
          { algorithm:'HS256',
                    expiresIn: '1h'},
          function (err, token) {
            if (err) {
              throw err;
            }
            res.cookie('token', token);
            res.status(200).json({ token });
          }
      );


    } else {
      res.status(400).json({ message: "Waiter doesn't exist" });
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
        const waiter = await auth(token);

        // if (waiter.Username == username && waiter.Password == password) {
        //     return res.status(200).json({});
        //
        // }
        // else {
        //     next();
        // }
        if (waiter){
            return res.status(200).json({message: 'You are already logged in'});
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

module.exports = { getWaiterByUsername, checkIfLogged };
