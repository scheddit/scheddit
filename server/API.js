// API
// ===
var passport  = require('passport');
var util      = require('util');
var crypto    = require('crypto');
var redditStrategy  = require('passport-reddit').Strategy;
var http = require('http');
var server = require('./server');
var request = require('request');

module.exports.api = function(app, schema) {

  var apiLogin = function(req, res, next) {
    req.session.state = crypto.randomBytes(32).toString('hex');
    passport.authenticate('reddit', {
      state: req.session.state,
      duration: 'permanent'
    })(req, res, next);
  };

  var apiUsers = function(req, res) {
    schema.userModel.findOne({'profile.name': req.user.name },
      'profile',
      function(err, result){
      res.send(result.profile);
    });
  };

  var apiPosts = function(req, res) {
    schema.userModel.findOne({'profile.name': req.user.name },
      'profile',
      function(err,result){
        schema.postModel.find({'redditProfileId': result.profile.id },
          function(err,result){
            res.send(result);
          }
        );
      });
  };

  var apiRedirect = function(req, res, next) {
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
  };
  var checkForNoCaptcha = function(username, callback){
    var body = {
      api_type: 'json',
      url: 'http://www.reddit.html',
      kind: 'link',
      title: 'test'
    };
    // when checking for Captcha for the reddit account
    // response.statusCode 200
    // {json: {captcha: "ryRyJ7e1XiShn98ck9HBZWdIS0q6w5vx", errors: [["BAD_CAPTCHA", "care to try these again?", "captcha"]]}}

    schema.userToken(username, function(token){
      request.post({
        url: 'https://oauth.reddit.com/api/submit',
        form: body,
        headers: { Authorization : "bearer " + token}
        },function(err, response, body){
          if(err) throw err;
          var redditError = JSON.parse(body).json.errors[0][0];
          callback(redditError);
      });
    });
  };

  var test = function(req, res, next) {
    // doesn't always have a req.user!
    var userName = req.user;
    // run the captcha check at this point
    checkForNoCaptcha(userName.name, function(errorMessage){
      if (errorMessage === "BAD_CAPTCHA") {
        console.log("BAD_CAPTCHA caught");
        // send something back to the client side with notice/error
        var error = {"error": errorMessage};
        res.send(200, JSON.stringify(error));
      } else {
        var success = {"success": "success"};
        res.send(200, JSON.stringify(success));
      }
    });
  };

  var apiSchedule = function(req, res, next) {
    // doesn't always have a req.user!
    var userName = req.user;
    schema.insertPost(req.body, req.user);
    var newResponse = {"success": "ADDED_TO_DB"};
    res.send(200, JSON.stringify(newResponse));
    // run the captcha check at this point
    // checkForNoCaptcha(userName.name, function(errorMessage){
    //   if (errorMessage === "BAD_CAPTCHA") {
    //     console.log("BAD_CAPTCHA caught");
    //     // send something back to the client side with notice/error
    //     var error = {"error": errorMessage};
    //     res.send(200, JSON.stringify(error));
    //   } else {
    //     console.log("saving to database");
    //     schema.insertPost(req.body, req.user);
    //   }
    // });
  };

  app.get('/api/login', apiLogin);

  app.get('/api/userdata', apiUsers);

  app.get('/api/userposts', apiPosts);

  app.get('/api/redirect', apiRedirect);

  app.post('/api/schedule', apiSchedule);

  app.post('/api/test', test);

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
