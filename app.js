var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var signupRouter = require('./routes/signup');
var profileRouter = require('./routes/profile');
var logoutRouter = require('./routes/logout');
var postIncomeRouter = require('./routes/income');
var quickviewRouter = require('./routes/quickview');
var postMaiserRouter = require('./routes/maiser');
var contactRouter = require('./routes/contact');

var app = express();
var session = require('express-session');
app.use(session({
  secret: 'trackmymaiser',
  resave: false,
  saveUninitialized: true
}));

const db = require('./db');
// Initial connection to database
db.connect()
.catch(error => console.log(error));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Auth middleware
app.use('/app', (req, res, next) => {
  if(!req.session.authenticated) {
    return res.render('login');
  }
  next();
});

app.use('/', loginRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/logout', logoutRouter);
// Protected routes
app.use('/app/profile', profileRouter);
app.use('/app/income', postIncomeRouter);
app.use('/app/quickview', quickviewRouter);
app.use('/app/maiser', postMaiserRouter);
app.use('/app/contact', contactRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
