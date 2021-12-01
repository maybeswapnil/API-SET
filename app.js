var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./src/index');
var usersRouter = require('./src/users');
var mainRouter = require('./src/main-app');
var checkoutRouter = require('./src/checkout');
var webhookRouter = require('./src/webhook');
var getapikeyRouter = require('./src/getapikey');
var porteRouter = require('./src/portefeuille');
var bodyParser = require('body-parser');
const registerRouter = require('./src/register');
var app = express();

app.listen(2000, () => {
  console.log("deployed")
})

var options = {
  inflate: true,
  limit: '100kb',
  type: 'application/octet-stream'
};

app.use(bodyParser.json({
  verify: (req, res, buf) => {
    req.rawBody = buf
  }
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/googleTop', mainRouter);
app.use('/users', usersRouter);
app.use('/checkout', checkoutRouter);
app.use('/webhook', webhookRouter);
app.use('/getapikey', getapikeyRouter);
app.use('/portefeuille', porteRouter);
app.use('/register', registerRouter);

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
