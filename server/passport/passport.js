const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const {getWaiterByUsernameQuery} = require('../repository/waiter.repository');

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;

passport.use(new JwtStrategy(opts, async function(payload, done) {
    try {
        const username = payload.username;

        const waiter = await getWaiterByUsernameQuery(username);

        return waiter ? done(null, waiter) : done(null, false);
    }
    catch (err){
        return done(err, false);
    }
}));

module.exports = passport;