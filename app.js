var express = require('express');
//var path = require('path');
var cookieParser = require('cookie-parser');
//var logger = require('morgan');
var logger = require('./services/log');

var indexRouter = require('./routes/index');

var app = express();

//app.use(logger('dev'));
app.use(logger.express);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Error Handling
app.use(function(err, req, res, next){
  logger.debug(err.stack);
  res.json({Cancel: true, Prompt: err.message, Detail: err.stack}).end();
});
app.use('/', indexRouter);

module.exports = app;
