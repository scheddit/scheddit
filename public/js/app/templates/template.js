this["JST"] = this["JST"] || {};

this["JST"]["public/template/post.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"post\">\r\n  <h4 class=\"underline\">";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h4>\r\n  <ul class=\"post-details\">\r\n    <li>\r\n      <div>\r\n        <span>kind</span>\r\n        <br/>\r\n        <span>";
  if (stack1 = helpers.kind) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.kind; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\r\n      </div>\r\n    <h4 class=\"underline\">";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h4>\r\n    <ul class=\"post-details\">\r\n      <li>\r\n        <div>\r\n          <span>kind</span>\r\n          <br/>\r\n          <span>";
  if (stack1 = helpers.kind) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.kind; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\r\n        </div>\r\n        </li>\r\n      <li>\r\n        <div><a href=\"";
  if (stack1 = helpers.url) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.url; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</a>\r\n          <span>content</span>\r\n          <br/>\r\n          <span>";
  if (stack1 = helpers.urlOrDetails) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.urlOrDetails; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\r\n        </div>\r\n        </li>\r\n      <li>\r\n        <div>\r\n          <span>subreddit</span>\r\n          <br/>\r\n          <span>";
  if (stack1 = helpers.subreddit) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.subreddit; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\r\n        </div>\r\n        </li>\r\n      <li>\r\n        <div>\r\n          <span>scheduled time</span>\r\n          <br/>\r\n          <span>"
    + escapeExpression(((stack1 = ((stack1 = depth0.schedule),stack1 == null || stack1 === false ? stack1 : stack1.date)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(((stack1 = ((stack1 = depth0.schedule),stack1 == null || stack1 === false ? stack1 : stack1.time)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\r\n        </div>\r\n      </li>\r\n    <li>\r\n      <div>\r\n        <span>content</span>\r\n        <br/>\r\n        <span>";
  if (stack2 = helpers.urlOrDetails) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.urlOrDetails; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</span>\r\n      </div>\r\n      </li>\r\n    <li>\r\n      <div>\r\n        <span>subreddit</span>\r\n        <br/>\r\n        <span>";
  if (stack2 = helpers.subreddit) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.subreddit; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</span>\r\n      </div>\r\n      </li>\r\n    <li>\r\n      <div>\r\n        <span>scheduled time</span>\r\n        <br/>\r\n        <span>"
    + escapeExpression(((stack1 = ((stack1 = depth0.schedule),stack1 == null || stack1 === false ? stack1 : stack1.date)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(((stack1 = ((stack1 = depth0.schedule),stack1 == null || stack1 === false ? stack1 : stack1.time)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\r\n      </div>\r\n    </li>\r\n  </ul>\r\n</div>\r\n";
  return buffer;
  });

this["JST"]["public/template/scheddit.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "scheddit.hbs<!-- HTML Template -->\r\n<div style=\"height:80px\"></div>\r\n<div class=\"container\">\r\n  <div class=\"frontPage explainIt\">\r\n    <p>Why would I want to know that? Can I use the gun? Anyhoo, your net-suits will allow you to experience Fry's worm infested bowels as if you were actually wriggling through them. Too much work. Let's burn it and say we dumped it in the sewer. But existing is basically all I do!</p>\r\n  </div>\r\n\r\n  <div class=\"tryIt\">\r\n    <p>Sign in and start using Scheddit now!</p>\r\n    <span id='loginButton'>\r\n      <a href=\"/api/login\"><img src=\"img/login.png\" ></a>\r\n    </span>\r\n  </div>\r\n\r\n  <div class=\"frontPage whatsIt\">\r\n    <p>Can I use the gun? Moving along&hellip; I don't 'need' to drink. I can quit anytime I want! Now that the, uh, garbage ball is in space. So, how 'bout them Knicks?</p>\r\n    <p>Kif might! Say it in Russian! We'll need to have a look inside you with this camera. That's the ONLY thing about being a slave. Does anybody else feel jealous and worried?</p>\r\n  </div>\r\n  <div class=\"frontPage whyIt\">\r\n    <p>You lived before you met me?! Hey, guess what you're accessories to. Check it out, y'all. Everyone who was invited is here. Leela, are you alright? You got wanged on the head.</p>\r\n    <p>I'm Santa Claus! No! Don't jump! I don't 'need' to drink. I can quit anytime I want! Really?! It's toe-tappingly tragic! Negative, bossy meat creature!</p>\r\n  </div>\r\n\r\n  <div id=\"frontPage work\">\r\n    <h2>How it works</h2>\r\n    <img src=\"img/how_it_works.png\">\r\n    <div class='howItWorksOutter'>\r\n      <div class='howItWorksInner'>Thing 1</div>\r\n      <div class='howItWorksInner'>Thing 2</div>\r\n    </div>\r\n    <div class='howItWorksOutter'>\r\n      <div class='howItWorksInner'>Thing 3</div>\r\n      <div class='howItWorksInner'>Thing 4</div>\r\n    </div>\r\n  </div>\r\n\r\n  <div id=\"frontPage team\" style=\"display: none\">\r\n    <h2>Meet the team</h2>\r\n    <p>sfhdsjfhdsjkfdfhsdjfshdsjkdf</p>\r\n  </div>\r\n\r\n</div>";
  });

this["JST"]["public/template/schedulePost.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "    <h4 class=\"underline\">";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h4>\n    <ul class=\"post-details\">\n      <li>\n        <div>\n          <span>kind</span>\n          <br/>\n          <span>";
  if (stack1 = helpers.kind) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.kind; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n        </div>\n        </li>\n      <li>\n        <div><a href=\"#\">";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</a>\n          <span>content</span>\n          <br/>\n          <span>";
  if (stack1 = helpers.urlOrDetails) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.urlOrDetails; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n        </div>\n        </li>\n      <li>\n        <div>\n          <span>subreddit</span>\n          <br/>\n          <span>";
  if (stack1 = helpers.subreddit) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.subreddit; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n        </div>\n        </li>\n      <li>\n        <div>\n          <span>scheduled time</span>\n          <br/>\n          <span>"
    + escapeExpression(((stack1 = ((stack1 = depth0.schedule),stack1 == null || stack1 === false ? stack1 : stack1.date)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(((stack1 = ((stack1 = depth0.schedule),stack1 == null || stack1 === false ? stack1 : stack1.time)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n        </div>\n      </li>\n    </ul>";
  return buffer;
  });

this["JST"]["public/template/user.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<!-- HTML Template -->\r\n<div style=\"height:80px\"></div>\r\n<div class=\"container\">\r\n  <h4 class=\"name\"><em>Welcome ";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "!</em></h4>\r\n  <div class=\"toShareForm\">\r\n    <h3 class=\"underline\"> What would you like to share today? </h3>\r\n    <form id=\"newPost\" name=\"submission\"class=\"initialCollapse\">\r\n      <select name=\"kind\" id=\"postType\" class=\"btn dropdown-toggle initialHide\">\r\n        <option selected=\"selected\">Select a type of post</option>\r\n        <option value=\"link\">Link</option>\r\n        <option value=\"self\">Self-Post</option>\r\n      </select>\r\n      <br/>\r\n      <div id=\"formWarning\" class=\"alert-block alert alert-error hidden\">";
  if (stack1 = helpers.warning) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.warning; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>\r\n      <input name=\"title\" id=\"postTitle\" type=\"text\" placeholder=\"title\" class=\"refresh initialHide\"></input>\r\n      <br/>\r\n      <input name=\"subreddit\" id=\"postSubreddit\" type=\"text\" placeholder=\"choose a subreddit\" class=\"refresh initialHide\"></input>\r\n      <br/>\r\n      <input name=\"urlOrDetails\" id=\"urlOrDetails\" type=\"url\" placeholder=\"URL or text\" class=\"refresh initialHide\"></input>\r\n      <br/>\r\n      <input type=\"date\" id=\"postDate\" name=\"date\" class=\"refresh initialHide\"></input>\r\n      <br/>\r\n      <input type=\"time\" id=\"postTime\" name=\"time\" class=\"refresh initialHide\"></input>\r\n      <br/>\r\n      <input type=\"submit\" name=\"submitButton\" class=\"submitButton initialHide\"></input>\r\n    </form>\r\n  </div>\r\n  <div id=\"schedule\"></div>\r\n  <div id=\"history\"></div>\r\n</div>";
  return buffer;
  });