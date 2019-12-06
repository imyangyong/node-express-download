var createError = require('http-errors');
var express = require('express');
var path = require('path');
var fs = require('fs');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var projectRouter = require('./routes/project');
// var usersRouter = require('./routes/users');
// var brcRouter = require('./routes/brc');
// var fsRouter = require('./routes/fsbank');
// var capitalGroupRouter = require('./routes/capitalGroup');
// var zhengtongRouter = require('./routes/zhengtong');

/**
 * method 获取project资源列表.
 * @return {Array} return 列表.
 */
function getResources() {
  let resources = fs.readdirSync(path.resolve(__dirname, 'resources'));
  return resources.map(file => ({
    url: file,
    name: file.split('-')[1]
  }))
}


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter(getResources()));
app.use('/', projectRouter);

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
