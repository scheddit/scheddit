// SERVER SIDE TEST SUITE
var request = require('superagent'),
  expect = require('expect.js'),
  app = require('../../server.js');


// BEFORE HOOK
before(function(){
  this.server = http.createServer(app).listen(3000);
});

// AFTER HOOK
after(function(done){
  this.server.close(done);
});

// TEST SUITES
describe('API: GET /hello', function() {
  it('Should Return 200', function(done) {
    request.get('localhost:3000/hello').end(function(res) {
      expect(res).to.exist;
      expect(res.status).to.equal(200);
      done();
    });
  });
});

//Write a test that will expect a 200 reply for enpoint /login GET
describe('API: GET /login', function() {
  it('Should Return 200', function(done) {
    request.get('localhost:3000/login').end(function(res) {
      expect(res).to.exist;
      expect(res.status).to.equal(200);
      done();
    });
  });
});


//Test for /login POST request response ( credentials exist in database )
//add those test credentials either here or just manually to db

//Test for unsuccessful response ( credentials that dont exist ) 401

//Also neet to test oauth

//test to return user data/posts at /userdata endpoint
// describe('API: GET /userdata', function() {
//   it('Should Return 200 and get user name', function(done) {
//     request.get('localhost:3000/userdata').end(function(res) {
//       expect(res).to.exist;
//       expect(res.status).to.equal(200);
//       expect(res.body.username).to.equal('bob');
//       done();
//     });
//   });
// });




/*Test database*/
//Test connection to db
//Test succesful insert user
//Test retreieve existent user (succesful)
//Test retreieve non existent user (failure)

//Test insert scheddit post data
//Test retrieval scheddit post data