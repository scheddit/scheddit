// DEPENDENCIES
// ============

var Config    = global.Config = require('./config/config.js').config;
var http      = require("http");
var port      = ( process.env.PORT || Config.listenPort );
var mongoose  = require('mongoose');
var API       = require('./API');
var app       = require('./appConfig');

// DATABASE SCHEMAS
// ================

var schema = require('./schemas/schema');

// DATABASE CONFIGURATION
// ======================

mongoose.connect('mongodb://' + Config.database.IP + ':' +Config.database.port + '/' + Config.database.name);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error:'));
db.once('open', function callback () {
  console.log('Connected to ' + Config.database.name);
});

// API
// ===

API.api(app, schema);

if (require.main === module) {
  http.createServer(app).listen(port, function(){
    console.info('Express server listening on port ' + port);
  });
} else {
  console.info('Running app as a module');
  exports.app = app;
}

