// API
// ===
var passport  = require('passport');
var util      = require('util');
var crypto    = require('crypto');
var redditStrategy  = require('passport-reddit').Strategy;
var http = require('http');


module.exports.api = function(app, schema) {

/* route organization
  {
    'login' : login function
    'userdata' : get userdata
  }*/

  // Sample Rest Call

  app.get('/hello', function(req, res) {
    res.send('<h1>Hello World!</h1>');
  });

  app.get('/login', function(req, res, next) {
    req.session.state = crypto.randomBytes(32).toString('hex');
    passport.authenticate('reddit', {
      state: req.session.state,
      duration: 'permanent'
    })(req, res, next);
  });

  app.get('/userdata', function(req, res) {
    //TO-DO: solidify schema
    //schema.getUserPosts

    //figure out how to get the userid of the client
    schema.userGet(req, res, 'dummyUser');

    //res.send(result);
  });

  app.get('/redirect', function(req, res, next) {
    //debugger;
    console.log('GET headers ', req.headers);

    if (req.query.state == req.session.state){
      // console.log('redireq', req);
      passport.authenticate('reddit', {
        successRedirect: '/#user',
        failureRedirect: '/login'
      })(req, res, next);
    }
    else {
      next( new Error(403) );
    }
  });

  app.post('/schedule', function(req, res, next) {
    // console.log('sched req',req.user);
    // console.log('POST headers ', req.headers);
    var postData = req.body;
    postData.isPending = true;
    schema.insertPost(postData);

  });

  // Simple route middleware to ensure user is authenticated.
  //   Use this route middleware on any resource that needs to be protected.  If
  //   the request is authenticated (typically via a persistent login session),
  //   the request will proceed.  Otherwise, the user will be redirected to the
  //   login page.
  function ensureAuthenticated(req, res, next) {
    console.log('ensuring');
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login');
  }
};