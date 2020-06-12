var express = require('express');
//var path = require('path');
var cookieParser = require('cookie-parser');
const ipfilter = require('express-ipfilter').IpFilter


//var logger = require('morgan');
var logger = require('./services/log');

var indexRouter = require('./routes/index');

var app = express();

// Whitelist the following IPs
// const ips = ['127.0.0.1'];

// IP Restriction
// app.use(ipfilter(ips, { mode: 'allow' }));

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
