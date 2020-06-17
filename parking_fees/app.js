const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy

const indexRouter = require('./routes/index')
const parkingFeeRouter = require('./routes/parkingFee')

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter)
app.use('/parking-fees', parkingFeeRouter)

// Bearer Auth Strategy
passport.use(new BearerStrategy(
    function (token, done) {
        if (!token) {
            return done(null, false);
        } else if (token === "E3lb3KP7RKejbyd") {
            return done(null, system, { scope: 'all' });
        } else {
            return done({ error: "Auth error"});
        }
    }
));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.status(404).json({ "error": "Resource not found" })
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.json(err.message)
});

module.exports = app;
