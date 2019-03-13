const data = require('../config/mockData.js')
const jwt = require('jsonwebtoken')
// validate user
const authenticateUser = (username, password) => {
    if (!username || !password) {
        return null
    }
    let authUser = {
        ...data.user
    }
    if (authUser.username.toLowerCase() != username.toLowerCase() ||
        authUser.password != password) {
        return null
    }
    const token = jwt.sign({
        username: authUser.username
    }, data.secret)
    return token
}

module.exports = function(app, passport) {

    // index route
    app.get('/', (req, res) => {
        res.json({
            msg: 'Passport-Jwt Express API'
        })
    })

    // authenticate route
    app.post('/api/authenticate', (req, res) => {
        const {
            username,
            password
        } = req.body
        const token = authenticateUser(username, password)
        if (!token) {
            return res.json({
                success: false,
                msg: 'Wrong credintials'
            })
        }
        return res.json({
            success: true,
            token
        })
    })

    // protected profile route
    app.get('/api/profile', passport.authenticate('jwt', {
        session: false
    }), (req, res) => {
        res.json({
            data: 'Profile page',
            user: req.user
        })
    })

}
