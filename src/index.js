const express = require('express')
const compression = require('compression')
const logger = require('morgan')
const path = require('path')
const passport = require('passport')
// passport setup
const passportSetup = require('./config/passport')
// app routes
const appRouter = require('./routes')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))
app.use(compression())

// passport initialize
passportSetup(passport)
app.use(passport.initialize())

// register app routes
appRouter(app, passport)

app.use((req, res, next) => {
    res.status(404).send('404 - Not Found!');
})

app.use((err, req, res, next) => {
    res.status(500).send('500 - Something was error!');
});

module.exports = app
