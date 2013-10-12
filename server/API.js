// API
// ===
var passport  = require('passport');
var util      = require('util');
var crypto    = require('crypto');
var redditStrategy  = require('passport-reddit').Strategy;
var http = require('http');

var request = require('request');
var server = require('./server');

module.exports.api = function(app, schema) {

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
    schema.userModel.findOne({'profile.name': req.user.name },
      'profile',
      function(err, result){
      res.send(result.profile);
    });
  });


  app.get('/userposts', function(req, res) {
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


  app.get('/redirect', function(req, res, next) {
    if (req.query.state == req.session.state){
      // console.log('redireq', req);
      passport.authenticate('reddit', {
        successRedirect: '/#user', // needs to send user along
        failureRedirect: '/login'
      })(req, res, next);
    }
    else {
      next( new Error(403) );
    }
  });

  app.post('/schedule', function(req, res, next) {

    var postData = req.body;
    postData.isPending = true;
    postData.redditProfileId = req.user.id;
    schema.insertPost(postData);

//moving this to postScheduled.js Script
    // //query mongo for this users oauth token
    // schema.userModel.findOne({'profile.name': req.user.name },
    //   'oauthInfo.accessToken oauthInfo.refreshToken', function(err, response){
    //     var token = response.oauthInfo.accessToken;
    //     var refresh = response.oauthInfo.refreshToken;
    //     var data = postData;

    //     var body = {
    //       api_type: 'json',
    //       title: data.title ,
    //       kind: 'link',
    //       url: data.urlOrDetails,
    //       sr: data.subreddit,
    //       r: data.subreddit
    //     };

    //     var headers = {
    //       Authorization: "bearer" + token
    //     };

    //     console.log("accessToken from db :" + token);

    //     request.post({
    //       url: 'https://oauth.reddit.com/api/submit', 
    //       form: body,
    //       headers: { Authorization: "bearer " + token}
    //     }, function(err, response, body){
    //       if(err) throw err;
    //       console.log('response.statusCode', response.statusCode);
    //       console.log(JSON.stringify(body));
    //     });

    // });

  });

  // Simple route middleware to ensure user is authenticated.
  //   Use this route middleware on any resource that needs to be protected.  If
  //   the request is authenticated (typically via a persistent login session),
  //   the request will proceed.  Otherwise, the user will be redirected to the
  //   login page.
  function ensureAuthenticated(req, res, next) {
    // console.log('ensuring');
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login');
  }
};
