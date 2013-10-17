var passport  = require('passport');
var util      = require('util');
var crypto    = require('crypto');
var redditStrategy  = require('passport-reddit').Strategy;

// DATABASE SCHEMAS
// ================

var schema = require('./schemas/schema');


// ENV VARIABLE CONFIGURATION
// ==========================

var redditConsumerKey = process.env.REDDIT_API_KEY;
var redditConsumerSecret = process.env.REDDIT_SECRET;

// PASSPORT CONFIGURATION
// ======================
// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Reddit profile  is
//   serialized and deserialized.
passport.serializeUser(function(user, done) {
  //so this is where we get the user's info which we will store in the db
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


// Use the RedditStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Reddit
//   profile), and invoke a callback with a user object.

var rStrategy = new redditStrategy({
    clientID: redditConsumerKey,
    clientSecret: redditConsumerSecret,
    callbackURL: "http://scheddit.com/api/redirect",
    scope: ['submit', 'identity','history']
  },
  function(accessToken, refreshToken, profile, done) {

    var conditions = { "profile.id" : profile.id };
    var update = {
      profile: profile._json,
      oauthInfo: {
        accessToken: accessToken,
        refreshToken: refreshToken
      }
    };

    var options = { upsert: true};
    //Update user document with current tokens if found in databse
    schema.userModel.findOneAndUpdate(conditions, update, options, function(){
    });
    return done(null, profile);
});


module.exports = rStrategy;