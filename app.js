var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var config = require('./controllers/config.js');

var index = require('./routes/index');
var home = require('./routes/home');
var signin = require('./routes/signin');
var exam = require('./routes/exam');
var course = require('./routes/course');
var student = require('./routes/student');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session(config.app.session));

app.use('/', index);
app.use('/', student)
app.use('/', home);
app.use('/signin', signin);
app.use('/exam', exam);
app.use('/course', course);
app.use('/docs', express.static(__dirname + '/docs'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  if (config.app.env == 'development') {
    res.locals.message = err.message;
    res.locals.error = err;
  } else {
    res.locals.error = {};
  }
  res.status(err.status || 500);
  res.render('error');
  if (err.status.toString().match(config.app.errorlog)) {
    console.log(err);
  }
});

module.exports = app;
