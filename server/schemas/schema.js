// DEPENDENCIES
// ============

var mongoose =     require('mongoose');
var Schema =     mongoose.Schema;
var objectID =     Schema.ObjectID;

// USER ACCOUNT SCHEMA
// ===================

var userSchema = new Schema({
  //TO-DO: add payment info/ plan level as necessary
  profile: {
    name: String,
    created: Number,
    created_utc: Number,
    link_karma: Number,
    comment_karma: Number,
    over_18: Boolean,
    is_gold: Boolean,
    is_mod: Boolean,
    has_verified_email: Boolean,
    id: String
  },
  oauthInfo: {
    accessToken: String,
    refreshToken: String
  }
});

var postSchema = new Schema({
  redditProfileId : String,
  title : String,
  kind : String,
  urlOrDetails: String,
  subreddit: String,
  // according to http://api.mongodb.org/perl/current/MongoDB/DataTypes.html
  // creating Date objects is slow and we should be storing
  // a Number and converting to a date
  schedule: {
    time: String,
    date: String
  },
  isPending: String,
  accessToken: String,
  refreshToken: String
});

// CREATE DATABASE MODEL
// =====================
var userModel = mongoose.model('user', userSchema);
var postModel = mongoose.model('post', postSchema);
module.exports.userModel = userModel;
module.exports.postModel = postModel;

// SCHEMA METHODS
// ==============
module.exports.insertPost = function(postData, user) {
  postData.redditProfileId = user.id;
  userModel.findOne({ 'profile.id': postData.redditProfileId},
   'oauthInfo.accessToken oauthInfo.refreshToken profile.id',
    function(err, user) {
      if(err) console.log(err);
      postData.accessToken = user.oauthInfo.accessToken;
      postData.refreshToken = user.oauthInfo.refreshToken;
      postData.redditProfileId = user.profile.id;
      postData.schedule = {};
      postData.schedule.date = postData.date;
      postData.schedule.time = postData.time;
      postData.isPending = "pending";
      var newPost = new postModel(postData);
      newPost.save(function (err) {
        if (err) console.log(err);
        else console.log('post saved!');
      });
    });
};

module.exports.userGet = function(req, res, username) {
  userModel.find({'profile.name': username}, function(err, user){
     if (err) throw err;
  //   res.send(user);
   });
};

module.exports.userToken = function(username, callback) {
  userModel.find({'profile.name': username},'oauthInfo.accessToken', function(err, token){
     if (err) throw err;
     callback(token[0].oauthInfo.accessToken);
   });
};

module.exports.usersPostsGet = function(req, res, userid) {
  res.send(dummyUser);
  // postModel.find({'_userid': userid}, function(err, posts){
  //   if (err) throw err;
  //   res.send(posts);
  // });
};
