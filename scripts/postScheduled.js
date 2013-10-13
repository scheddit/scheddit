var request   = require('request');
var mongoose  = require('mongoose');
var schema    = require('../server/schemas/schema');
var dateLib   = require('../server/lib/date');
var Config    = global.Config = require('../server/config/config.js').config;

mongoose.connect('mongodb://' + Config.database.IP + ':' +Config.database.port + '/' + Config.database.name);

var date = new Date;
var tasksRetrieved = 0;
var completedTasks = 0;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error:'));
db.once('open', function callback () {
  console.log('Connected to ' + Config.database.name);
});

var updateCallback = function(err,response){
  if(err) throw err;
  console.log("set isPending false response " + response);
  completedTasks++;
  if(completedTasks === tasksRetrieved){
    process.exit(0);
  }
};

var postCallback = function(index) {
  return function(err, response, body){
    //use third status that tell that we tried once
    //store err in database
    //use index
    var id = index;
    if(err) throw err;
    console.log('response.statusCode', response.statusCode);
    console.log('this posts ID:', id);
    console.log(JSON.stringify(body));
    //update isPending Flag to false
    schema.postModel.update({ _id : id },
      { $set: { isPending : false }}, updateCallback);
  };
};

var isEmpty = function (collection) {
   for(var record in collection) {
      if (collection.hasOwnProperty(record)) {
         return false;
      }
   }
   return true;
};

schema.postModel.find({'isPending': true },
  function(err,collection){
    if(err) throw err;

    if (isEmpty(collection)) {
      process.exit(0);
    }

    console.log("Current Time:" + date.getTime());
    for(var row in collection){
      record = collection[row];
      tasksRetrieved++;
      var scheduledTime = record.schedule.date + " " + record.schedule.time;
      console.log("DateTime from post: ", scheduledTime);
      var scheduleTimePOSIX = Date.parse(scheduledTime);
      console.log("Schedule Time: ", scheduleTimePOSIX);

      if(scheduleTimePOSIX < date.getTime()){

        console.log("Posting ", record.title);

        var body = {
          api_type: 'json',
          title: record.title ,
          kind: 'link',
          url: record.urlOrDetails,
          sr: record.subreddit,
          r: record.subreddit
        };

        console.log(record);
        console.log("AccessToken from db :" + record.accessToken);

        request.post({
            url: 'https://oauth.reddit.com/api/submit',
            form: body,
            headers: { Authorization: "bearer " + record.accessToken}
          }, postCallback(record._id));
      } else {
        completedTasks++;
      }
    }
    if(completedTasks === tasksRetrieved){
      process.exit(0);
    }
});
