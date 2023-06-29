const express = require("express");
const router = express.Router();
const { checkIfLogged, getUserByUsername } = require("../controllers/login.controller");


router.get("/",
    checkIfLogged
);

router.post(
  "/",
  checkIfLogged,
  getUserByUsername
);

module.exports = router;
