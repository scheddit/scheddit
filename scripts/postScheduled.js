var request   = require('request');
var mongoose  = require('mongoose');
var schema    = require('../server/schemas/schema');
var Config    = global.Config = require('../server/config/config.js').config;

mongoose.connect('mongodb://' + Config.database.IP + ':' +Config.database.port + '/' + Config.database.name);

var date = new Date();
var tasksRetrieved = 0;
var completedTasks = 0;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error:'));
db.once('open', function callback () {
  console.log('Connected to ' + Config.database.name);
});

var checkIfDone = function(err,response){
  if(err) throw err;
  completedTasks++;
  if(completedTasks === tasksRetrieved){
    db.close();
    process.exit(0);
  }
};

var postCallback = function(record) {
  return function(err, response, body){
    //use third status that tell that we tried once
    //store err in database
    //use index
    if(err) throw err;
    console.log('response.statusCode', response.statusCode);
    console.log('this posts ID:', record.id);
    console.log(JSON.parse(body));
    //if body does not contain record.title, update 
    //isPending flag to 'error'
    if (JSON.parse(body).name === undefined){
      console.log("error!");
      schema.postModel.update({ _id : record.id },
        { $set: { isPending : 'error' }}, checkIfDone);
    } else {
      //update isPending Flag to sent
      console.log("sent!")
      schema.postModel.update({ _id : record.id },
        { $set: { isPending : 'sent' }}, checkIfDone);
    }

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

var handleResults =  function(err,collection){
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
          kind: record.kind,
          save: true,
          sr: record.subreddit,
          r: record.subreddit
        };

        if(record.kind ==='link'){
          body.url = record.urlOrDetails;
        }else{
          body.text = record.urlOrDetails;
        }

        console.log(record);
        console.log("AccessToken from db :" + record.accessToken);

        request.post({
            url: 'https://oauth.reddit.com/api/submit',
            form: body,
            headers: { Authorization: "bearer " + record.accessToken}
          }, postCallback(record));
      } else {
        completedTasks++;
      }
    }
    if(completedTasks === tasksRetrieved){
      process.exit(0);
    }
};


schema.postModel.find({'isPending': 'pending' }).limit(20).execFind(handleResults);
