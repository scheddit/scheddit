var request = require('request');

var token = 'vwEQSgJs_sIkqeBowUelzmn6OZg';

var body = {
  api_type: 'json',
  url: 'http://www.reddit.html',
  kind: 'link',
  title: 'BAD_CAPTCHA test'
};

request.post({
  url: 'https://oauth.reddit.com/api/submit',
  form: body,
  headers: { Authorization : "bearer " + token}
  },function(err, response, body){
    if(err) throw err;
    console.log('response.statusCode', response.statusCode);
    var redditError = JSON.parse(body).json.errors[0][0];
    if(redditError === "BAD_CAPTCHA") {
      console.log(redditError);
    }
});

