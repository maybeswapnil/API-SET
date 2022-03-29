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
const workRouter = require('./src/work');
const csvtojsonRouter = require('./src/csvtojson');
const infoRouter = require('./src/info');
const nasaRouter = require('./src/nasa')
var app = express();

var cors = require('cors');

app.use(cors())
const style = 'font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)';
var port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log('%c' + new Date() + ' Server Deployed', style)
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
app.use('/work', workRouter);
app.use('/csvtojson', csvtojsonRouter);
app.use('/info', infoRouter);
app.use('/location', nasaRouter);

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
  res.render('error')
});

module.exports = app;