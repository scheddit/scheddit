var request   = require('request');
var mongoose  = require('mongoose');
var schema    = require('../server/schemas/schema');
var Config    = global.Config = require('../server/config/config.js').config;

mongoose.connect('mongodb://' + Config.database.IP + ':' +Config.database.port + '/' + Config.database.name);

var redditConsumerKey = process.env.REDDIT_API_KEY;
var redditConsumerSecret = process.env.REDDIT_SECRET;

var date = new Date();
var tasksRetrieved = 0;
var completedTasks = 0;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error:'));
db.once('open', function callback () {
  console.log('Connected to ' + Config.database.name);
});

var checkIfDone = function(err,response){
  if (err) throw new Error("Error from DB Update: ", err);
  completedTasks++;
  if(completedTasks === tasksRetrieved){
    db.close();
    process.exit(0);
  }
};

var isEmpty = function (collection) {
   for(var record in collection) {
      if (collection.hasOwnProperty(record)) {
         return false;
      }
   }
   return true;
};

var postCallback = function(record) {

  return function(err, response, body){
    if (err) throw new Error("Error from Post: ", err);
    console.log("Returning from attempt to post: ", record.title);
    console.log('Response Body from POST: ', JSON.parse(body));
    console.log('Response.statusCode: ', response.statusCode);
 
    //if body does not contain record.title, update 
    //isPending flag to 'error'
    if (JSON.parse(body).data === undefined){
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

var postToReddit = function(redditProfileId, postList){

  return function(err,response, body){
    if (err) throw new Error("Error from RefreshToken: ", err);

    var thisToken = JSON.parse(body).access_token;

    console.log('Response to Refresh Token: ', JSON.parse(body));
    //console.log('Postbody: ', postBody);
    //console.log('AccessToken from refresh Call :' + thisToken);

    for(var i = 0; i < postList.length; i++){
      console.log('In Post Loop for  :', postList[i].title)
      request.post({
        url: 'https://oauth.reddit.com/api/submit',
        form: postList[i],
        headers: { Authorization: 'bearer ' + thisToken}
      }, postCallback(postList[i]));
    }

  };

};



var refreshTokenThenPostList = function(refreshToken, redditProfileId, postList){

  console.log('Refreshing Token from reddit with', refreshToken);

  var refreshBody = {
    grant_type : 'refresh_token',
    refresh_token : refreshToken,
    client_id : 'redditConsumerKey',
    client_secret : 'redditConsumerSecret',
    scope : 'submit',
    duration : 'permanent',
    redirect_uri : 'http://localhost:1337/api/redirect'
  };

  var authorization = 'Basic ' + Buffer('' + redditConsumerKey + ':' + redditConsumerSecret).toString('base64');

  request.post({
    url: 'https://ssl.reddit.com/api/v1/access_token',
    form: refreshBody,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', Authorization : authorization }
    }, postToReddit(redditProfileId, postList));

};


var handleResults =  function(err,collection){
    if (err) throw new Error("Error from DB Find: ", err);

    if (isEmpty(collection)) {
      process.exit(0);
    }

    //create object of users/arrayofposts
    //for each row, add the userId to postGroupsObject if doesn't exist
    //creating new array, if exists, push article to this array
    //refresh auth for this user, send this group
    
    var postsByUser = {};
    for(var row in collection){
      
      tasksRetrieved++;
      
      var record = collection[row];
      console.log(record);
    
      var scheduledTime = record.schedule.date + " " + record.schedule.time;
      //console.log("DateTime from post: ", scheduledTime);
      var scheduleTimePOSIX = Date.parse(scheduledTime);
      //console.log("Schedule Time: ", scheduleTimePOSIX);
       
      //check schedule against current time
      if(scheduleTimePOSIX < date.getTime()){
        var userID = record.redditProfileId;

        console.log("Posting ", record.title);
        
        //format record to be reddit API friendly
        var body = {
          api_type: 'json',
          title: record.title ,
          kind: record.kind,
          save: true,
          sr: record.subreddit,
          r: record.subreddit,
          refreshToken: record.refreshToken,
          id : record._id
        };

        if(record.kind ==='link'){
          body.url = record.urlOrDetails;
        }else{
          body.text = record.urlOrDetails;
        }

        //create array in object for user posts if none exists
        if(!postsByUser.hasOwnProperty(record.redditProfileId)){
          console.log('init array');
          postsByUser[record.redditProfileId] = [];
        }        

        postsByUser[record.redditProfileId].push(body);
        
      } else {
        completedTasks++;
      }

    }

    for(var user in postsByUser){
       var refreshToken = postsByUser[user][0].refreshToken;
       console.log(postsByUser[user]);
       refreshTokenThenPostList(refreshToken, user, postsByUser[user]);
    }

};


schema.postModel.find({'isPending': 'pending' }).limit(20).execFind(handleResults);
