var Config    = global.Config = require('./config/config.js').config;
var express   = require("express");
var passport  = require('passport');
var rStrategy = require('./passportConfig');
var app = express();
// APP CONFIGURATION
// ====================

app.configure(function() {
  app.use(express["static"](__dirname + "/../public"));
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));

  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({ secret: Config.sessionSecret }));

  app.use(passport.initialize());
  app.use(passport.session());
  passport.use('reddit', rStrategy);

  app.use(app.router);
});

module.exports = app;