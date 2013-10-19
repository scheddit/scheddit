var request   = require('request');
var mongoose  = require('mongoose');
var schema    = require('../server/schemas/schema');
var Config    = global.Config = require('../server/config/config.js').config;

mongoose.connect('mongodb://' + Config.database.IP + ':' +Config.database.port + '/' + Config.database.name);

var token = '71yzK0NUo1hoBqBJ1hcSx9Lzieo';

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error:'));
db.once('open', function callback () {
  console.log('Connected to ' + Config.database.name);
});

var getUserSubmittedCallback = function(err, response, body){
    if(err) throw err;
    console.log('body: ', JSON.stringify(body, null, '\t'));
};

request.get({
    url: 'https://oauth.reddit.com/user/kevinmrr/submitted',
    headers: { Authorization: "bearer " + token}
  }, getUserSubmittedCallback);
