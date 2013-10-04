// DEPENDENCIES
// ============

var mongoose =     require('mongoose'),
    Schema =     mongoose.Schema,
    objectID =     Schema.ObjectID;

// USER ACCOUNT SCHEMA
// ===================

var userSchema = new Schema({
  //TO-DO: add payment info/ plan level as necessary
  _userid : Number,
  username : String
});

var postSchema = new Schema({
  _userid : Number,
  title : String,
  isLink : Boolean,
  url: String,
  contents: String,
  subr: String,
  time: Date,
  isPending: Boolean
});

// CREATE DATABASE MODEL
// =====================
var userModel = mongoose.model('userModel', userSchema);
var postModel = mongoose.model('postModel', postSchema);
module.exports.userModel = userModel;
module.exports.postModel = postModel;

var dummyUser = { _userid : 1, username: 'bob' };
var dummyPosts = { _userid : 1, title : 'my test post',
    isLink: false,
    contents: 'this is the body of the post',
    subr : 'scheddit'
  };


// SCHEMA METHODS
// ==============

module.exports.userGet = function(req, res, username) {
  res.send(dummyUser);
  // userModel.find({'username': username}, function(err, user){
  //   if (err) throw err;
  //   res.send(user);
  // });
};


module.exports.usersPostsGet = function(req, res, userid) {
  res.send(dummyUser);
  // postModel.find({'_userid': userid}, function(err, posts){
  //   if (err) throw err;
  //   res.send(posts);
  // });
};
