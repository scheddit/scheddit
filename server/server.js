// DEPENDENCIES
// ============

var Config    = global.Config = require('./config/config.js').config;
var express   = require("express");
var http      = require("http");
var port      = ( process.env.PORT || Config.listenPort );
var server    = module.exports = express();
var mongoose  = require('mongoose');
var API       = require('./API');
var passport  = require('passport');
var util      = require('util');
var redditStrategy  = require('passport-reddit').Strategy;

// ENV VARIABLE CONFIGURATION
// ==========================

var redditConsumerKey = process.env.REDDIT_API_KEY;
var redditConsumerSecret = process.env.REDDIT_SECRET;

// DATABASE CONFIGURATION
// ======================

// Connect to Database
mongoose.connect('mongodb://' + Config.database.IP + ':' +Config.database.port + '/' + Config.database.name);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error:'));
db.once('open', function callback () {
  console.log('Connected to ' + Config.database.name);
});

// DATABASE SCHEMAS
// ================

var schema = require('./schemas/schema');

// SERVER CONFIGURATION
// ====================

server.configure(function() {
  server.use(express["static"](__dirname + "/../public"));
  server.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));

  server.use(express.bodyParser());
  server.use(express.cookieParser());
  server.use(express.session({ secret: Config.sessionSecret }));

  server.use(passport.initialize());
  server.use(passport.session());

  server.use(server.router);
});

// API
// ===

API.api(server, schema);

// Start Node.js Server
http.createServer(server).listen(port);

console.log('\n\nWelcome to Stacked!\n\nPlease go to http://localhost:' + port + ' to start using Require.js and Backbone.js\n\n');
