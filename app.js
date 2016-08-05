var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
require('dotenv').config()
var routes = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var dashboard = require('./routes/dashboard');
var trips = require('./routes/trips');
var app = express();
var passport = require('passport')
var passportStrategies = require('./controllers/auth/passport_strategies')
app.use(logger('dev'))
var uber = require('./routes/uber')
var profile = require('./routes/profile')
var locations = require('./routes/locations')

var directionsScheduleController = require('./controllers/schedule/directionsScheduleController')
// reload all trips and get directions
// directionsScheduleController.runAllWithSchedule('*/1 * * * *')
directionsScheduleController.runAll()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
var session = require('express-session')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Authentication configuration
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'secret'
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(express.static(path.join(__dirname, 'public')));
app.use('/nm', express.static(__dirname + '/node_modules/'));
app.use('/', routes);
app.use('/users', users);
app.use('/trips', trips);
app.use('/login', login);
app.use('/dashboard', dashboard);
app.use('/uber', uber);
app.use('/profile', profile);
app.use('/locations', locations);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
