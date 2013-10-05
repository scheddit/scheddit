// DEPENDENCIES
// ============

var Config    = global.Config = require('./config/config.js').config;
var express   = require("express");
var http      = require("http");
var port      = ( process.env.PORT || Config.listenPort );
var mongoose  = require('mongoose');
var API       = require('./API');
var passport  = require('passport');
var util      = require('util');
var crypto    = require('crypto');
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


// PASSPORT CONFIGURATION
// ======================
// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Reddit profile is
//   serialized and deserialized.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


// Use the RedditStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Reddit
//   profile), and invoke a callback with a user object.
passport.use(new redditStrategy({
    clientID: redditConsumerKey,
    clientSecret: redditConsumerSecret,
    callbackURL: "http://localhost:1337/redirect"
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {


      // To keep the example simple, the user's Reddit profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Reddit account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
));

// APP CONFIGURATION
// ====================

var app = express();

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

// Start Node.js app
app.listen(1337);

console.log('\n\nWelcome to Stacked!\n\nPlease go to http://localhost:' + port + ' to start using Require.js and Backbone.js\n\n');
