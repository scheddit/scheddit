var request   = require('request');
var mongoose  = require('mongoose');
var schema    = require('../server/schemas/schema');
var dateLib   = require('../server/lib/date');
var Config    = global.Config = require('../server/config/config.js').config;

mongoose.connect('mongodb://' + Config.database.IP + ':' +Config.database.port + '/' + Config.database.name);

var date = new Date;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error:'));
db.once('open', function callback () {
  console.log('Connected to ' + Config.database.name);
});

var updateCallback = function(err,response){
  if(err) throw err;
  console.log("set isPending false response " + response);
};

var postCallback =function(index) {
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
    process.exit(0);
  };
};


schema.postModel.find({'isPending': true },
  function(err,result){
    if(err) throw err;
    if(!result){
      process.exit(0);
    }

    console.log("Current Time:" + date.getTime());
    for(var elm in result){
      var scheduledTime = result[elm].schedule.date + " " + result[elm].schedule.time;
      console.log("DateTime from post: ", scheduledTime);
      var scheduleTimePOSIX = Date.parse(scheduledTime);
      console.log("Schedule Time: ", scheduleTimePOSIX);

      if(scheduleTimePOSIX < date.getTime()){

        console.log("Posting ", result[elm].title);

        var body = {
          api_type: 'json',
          title: result[elm].title ,
          kind: 'link',
          url: result[elm].urlOrDetails,
          sr: result[elm].subreddit,
          r: result[elm].subreddit
        };

        console.log(result[elm]);
        console.log("accessToken from db :" + result[elm].accessToken);

        request.post({
            url: 'https://oauth.reddit.com/api/submit',
            form: body,
            headers: { Authorization: "bearer " + result[elm].accessToken}
          }, postCallback(result[elm]._id));
      }
    }
});
