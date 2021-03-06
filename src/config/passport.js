const {
    ExtractJwt,
    Strategy
} = require('passport-jwt')
const data = require('./mockData')

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: data.secret,
    jsonWebTokenOptions: {
        expiresIn: 600 // 10min
    }
}

module.exports = function(passport) {
    passport.use(new Strategy(options, (jwt_payload, done) => {
        const username = jwt_payload.username
        // get user from db
        let authUser = {
            ...data.user
        }
        if (authUser.username != username) {
            return done(new Error('User Not Found'), null)
        }
        delete authUser.password
        return done(null, authUser)
    }))
}
