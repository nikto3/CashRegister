const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const {getuserByUsernameQuery} = require('../repository/user.repository');

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;

passport.use(new JwtStrategy(opts, async function(payload, done) {
    try {
        const username = payload.username;

        const user = await getuserByUsernameQuery(username);

        console.log("user:",user);

        return user ? done(null, user) : done(null, false);
    }
    catch (err){
        return done(err, false);
    }
}));

module.exports = passport;