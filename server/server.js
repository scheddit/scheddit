// DEPENDENCIES
// ============

var Config    = global.Config = require('./config/config.js').config;
var express   = require("express");
var http      = require("http");
var port      = ( process.env.PORT || Config.listenPort );
var app = module.exports = express();

var mongoose  = require('mongoose');
var API       = require('./API');
var passport  = require('passport');
var rStrategy = require('./passportConfig');

// DATABASE SCHEMAS
// ================

var schema = require('./schemas/schema');

// DATABASE CONFIGURATION
// ======================

mongoose.connect('mongodb://' + Config.database.IP + ':' +Config.database.port + '/' + Config.database.name);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error:'));
db.once('open', function callback () {
  console.log('Connected to ' + Config.database.name);
});

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

  app.use(app.router);
});

// API
// ===

API.api(app, schema);
passport.use('reddit', rStrategy);


if (require.main === module) {
  http.createServer(app).listen(port, function(){
    console.info('Express server listening on port ' + port);
  });
} else {
  console.info('Running app as a module');
  exports.app = app;
}

