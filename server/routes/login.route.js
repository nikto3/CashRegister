const express = require("express");
const router = express.Router();
const {getWaiterByUsername} = require('../controllers/login.controller');
const { checkIfLogged } = require("../controllers/login.controller");
const passport = require('passport');

router.get("/login", checkIfLogged, (req, res) => {
  res.json({message: 'Welcome to log in page'});
});

router.post(
  "/login",
  checkIfLogged,
  getWaiterByUsername
);

module.exports = router;
