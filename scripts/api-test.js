var request = require('request');

var token = 'cJYCvuVXJ8J_YxIvFhQYa9WS1dE';

var body = {
  api_type: 'json',
  url: 'http://www.nytimes.com/2013/10/06/us/a-federal-budget-crisis-months-in-the-planning.html',
  kind: 'link',
  sr: 'testonetwo',
  title: 'Crisis Budget Planned',
  r: 'testonetwo'
};

request.post({
  url: 'https://oauth.reddit.com/api/submit',
  form: body,
  headers: { Authorization : "bearer " + token}
  },function(err, response, body){
    if(err) throw err;
    console.log('response.statusCode', response.statusCode);
    console.log(JSON.stringify(body));
});

