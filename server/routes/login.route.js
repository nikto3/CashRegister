const express = require("express");
const router = express.Router();
const { checkIfLogged, getUserByUsername } = require("../controllers/login.controller");
const passport = require('passport');

router.get("/",
    (req, res) => {


      res.status(200).json({message: 'Welcome to log in page'});
});

router.post(
  "/",
  checkIfLogged,
  getUserByUsername
);

module.exports = router;
