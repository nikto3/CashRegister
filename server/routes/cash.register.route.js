const express = require('express');
const router = express.Router();
const passport = require('../passport/passport');

router.get('/',
    passport.authenticate('jwt', {session: false, failureRedirect: '/login'}),
    (req, res) => {
    res.json({message: 'Welcome to cash register page'});
});


module.exports = router;

