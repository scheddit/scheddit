// API
// ===


module.exports.api = function(server, schema) {

  // Sample Rest Call

  server.get('/hello', function(req, res) {
    res.send('<h1>Hello World!</h1>');
  });

  server.get('/login', function(req, res) {
    res.send('<h1>login World!</h1>');
  });

  server.get('/userdata', function(req, res) {
    //TO-DO: solidify schema
    //schema.getUserPosts

    //figure out how to get the userid of the client
    schema.userGet(req, res, 'dummyUser');

    //res.send(result);
  });

};
