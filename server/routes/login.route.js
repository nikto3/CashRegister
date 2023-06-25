const express = require("express");
const router = express.Router();
const { checkIfLogged, getuserByUsername } = require("../controllers/login.controller");
const passport = require('passport');

router.get("/",
    (req, res) => {
      if (req.user){
            res.status(200).redirect('/cash-register');
      }

      res.status(200).json({message: 'Welcome to log in page'});
});

router.post(
  "/",
  checkIfLogged,
  getuserByUsername
);

module.exports = router;
