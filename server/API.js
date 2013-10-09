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
        successRedirect: '/#user', // needs to send user along
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

    // var options = {
    //   hostname: 'www.reddit.com',
    //   port: 80,
    //   path: '/api/me.json',
    //   method: 'POST'
    //   // headers: req.headers
    // };

    // var request = http.request(options, function(response) {
    //   var total = '';
    //   response.on('data', function(chunk){
    //     total += chunk;
    //   });
    //   response.on('end', function() {
    //     console.log('modhash? ', total);
    //   });
    // });

    // request.on('error', function(e) {
    //   console.log('Error: ', e);
    // });

    // request.end();
    //TODO: figure out how we determine who the user is so we can store something in _userid

    // ensureAuthenticated(req, res, function(){
      postData.isPending = true;
      // schema.insertPost(postData);
      // }, res);
    // });

    var options2 = {
      hostname: 'www.reddit.com',
      port: 80,
      path: '/api/submit',
      method: 'POST'
      // headers: req.headers
    };

    var request2 = http.request(options2, function(res) {
      console.log('STATUS: ' + res.statusCode);
      console.log('HEADERS: ' + JSON.stringify(res.headers));
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
      });
    });

    request2.on('error', function(e) {
      console.log('problem with request: ' + e.message);
    });

    // write data to request body
    request2.write('data\n');
    request2.write('data\n');
    request2.end();
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