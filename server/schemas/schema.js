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
  time: Date,
  isPending: Boolean,
  accessToken: String
});

// CREATE DATABASE MODEL
// =====================
var userModel = mongoose.model('user', userSchema);
var postModel = mongoose.model('post', postSchema);
module.exports.userModel = userModel;
module.exports.postModel = postModel;

// SCHEMA METHODS
// ==============
module.exports.insertPost = function(postData, res) {
    userModel.findOne({ 'profile.id': postData.redditProfileId}, 'oauthInfo.accessToken', function(err, user) {
      if(err) console.log(err);
      postData.accessToken = user.oauthInfo.accessToken;
    });
    var newPost = new postModel(postData);
    newPost.save(function (err) {
      if (err) console.log(err);
      else console.log('post saved!');
    });
};

module.exports.userGet = function(req, res, username) {
  userModel.find({'username': username}, function(err, user){
     if (err) throw err;
     console.log("user: " + user.profile.name);
  //   res.send(user);
   });
};


module.exports.usersPostsGet = function(req, res, userid) {
  res.send(dummyUser);
  // postModel.find({'_userid': userid}, function(err, posts){
  //   if (err) throw err;
  //   res.send(posts);
  // });
};
