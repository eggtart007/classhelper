var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var home = require('./routes/home');
var login = require('./routes/login');
var logout = require('./routes/logout');
var qrcode = require('./routes/qrcode');
var signin = require('./routes/signin');
var signinresult = require('./routes/signinresult');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: '_CLASS_HELPER_',
  cookie: { maxAge: 1000*60*60*6 },
  key: 'sessionid'
}));

app.use('/', index);
app.use('/home', home);
app.use('/login', login);
app.use('/logout', logout);
app.use('/qrcode', qrcode);
app.use('/signin', signin);
app.use('/s', signin);
app.use('/signinresult', signinresult);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.locals.error =  err;
  // render the error page
  res.status(err.status || 500);
  res.render('error');
  if (err.status >= 500) {
    console.log(err);
  }
});

module.exports = app;
