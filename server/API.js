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

/* to-do : refactor route organization
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
    //result = schema.userGet(req, res, 'dummyUser');

    schema.userModel.findOne({'profile.name': req.user.name }, 'profile', function(err, result){
      res.send(result.profile);
    });

  });


  app.get('/userposts', function(req, res) {
    schema.userModel.findOne({'profile.name': req.user.name }, 'profile.id', function(err, result){
      var posts = [];
      //find all posts w/ id = result.profile.id;
      debugger;
      res.send(result.posts);
    });
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


    var postData = req.body;
    postData.isPending = true;
    schema.insertPost(postData);


    //query mongo for this users oauth token
    schema.userModel.findOne({'profile.name': req.user.name },
      'oauthInfo.accessToken oauthInfo.refreshToken', function(err, response){
        var token = response.oauthInfo.accessToken;
        var refresh = response.oauthInfo.refreshToken;
        var body = {
          api_type: 'json',
          kind: 'link',
          sr: 'testonetwo',
          title: 'The Url for Google',
          url: 'http://www.google.com',
          then: 'comments'
        };

        // var headers = {
        //   'Content-Type':'application/json',
        //   'User-Agent':'scheddit'
        // };

        console.log("accessToken from db :" + token);

        request.post({
          url: 'https://oauth.reddit.com/api/submit', 
          json: true,
          body: body,
          headers: { Authorization: "Bearer " + token + ", scope=submit", 'User-Agent': 'Requests test'}
        }, function(err, response, body){
          //debugger;
          console.log(err, body);
        });

    });

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