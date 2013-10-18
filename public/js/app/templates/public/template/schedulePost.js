define(['handlebars'], function(handlebars){
var template = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"post\">\n  <h4 class=\"underline\">";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h4>\n  <ul class=\"post-details\">\n    <li>\n      <div>\n        <span>kind</span>\n        <br/>\n        <span>";
  if (stack1 = helpers.kind) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.kind; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n      </div>\n      </li>\n    <li>\n      <div><a href=\"#\">";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</a>\n        <span>content</span>\n        <br/>\n        <span>";
  if (stack1 = helpers.urlOrDetails) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.urlOrDetails; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n      </div>\n      </li>\n    <li>\n      <div>\n        <span>subreddit</span>\n        <br/>\n        <span>";
  if (stack1 = helpers.subreddit) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.subreddit; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n      </div>\n      </li>\n    <li>\n      <div>\n        <span>scheduled time</span>\n        <br/>\n        <span>"
    + escapeExpression(((stack1 = ((stack1 = depth0.schedule),stack1 == null || stack1 === false ? stack1 : stack1.date)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(((stack1 = ((stack1 = depth0.schedule),stack1 == null || stack1 === false ? stack1 : stack1.time)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n      </div>\n    </li>\n  </ul>\n</div>\n";
  return buffer;
  })
return template
});
