// API
// ===
var passport  = require('passport');
var util      = require('util');
var crypto    = require('crypto');
var redditStrategy  = require('passport-reddit').Strategy;
var http = require('http');
var server = require('./server');

module.exports.api = function(app, schema) {

  app.get('/api/login', function(req, res, next) {
    req.session.state = crypto.randomBytes(32).toString('hex');
    passport.authenticate('reddit', {
      state: req.session.state,
      duration: 'permanent'
    })(req, res, next);
  });

  app.get('/api/userdata', function(req, res) {
    schema.userModel.findOne({'profile.name': req.user.name },
      'profile',
      function(err, result){
      res.send(result.profile);
    });
  });

  app.get('/api/userposts', function(req, res) {
    schema.userModel.findOne({'profile.name': req.user.name },
      'profile',
      function(err,result){
        schema.postModel.find({'redditProfileId': result.profile.id },
          function(err,result){
            //debugger;
            res.send(result);
          }
        );
      });
  });

  app.get('/api/redirect', function(req, res, next) {
    if (req.query.state == req.session.state){
      // console.log('redireq', req);
      passport.authenticate('reddit', {
        successRedirect: '/#user', // needs to send user along
        failureRedirect: '/'
      })(req, res, next);
    }
    else {
      next( new Error(403) );
    }
  });

  app.post('/api/schedule', function(req, res, next) {
    var postData = req.body;
    postData.isPending = "pending";
    postData.redditProfileId = req.user.id;
    schema.insertPost(postData);
    res.redirect('/#user');
    res.send();
  });

  // Simple route middleware to ensure user is authenticated.
  //   Use this route middleware on any resource that needs to be protected.  If
  //   the request is authenticated (typically via a persistent login session),
  //   the request will proceed.  Otherwise, the user will be redirected to the
  //   login page.
  function ensureAuthenticated(req, res, next) {
    // console.log('ensuring');
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/api/login');
  }
};
