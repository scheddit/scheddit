define(['handlebars'], function(handlebars){
var template = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"post\">\r\n  <h4 class=\"underline\">";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h4>\r\n  <ul class=\"post-details\">\r\n    <li>\r\n      <div>\r\n        <span>kind</span>\r\n        <br/>\r\n        <span>";
  if (stack1 = helpers.kind) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.kind; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\r\n      </div>\r\n      </li>\r\n    <li>\r\n      <div>\r\n        <span>content</span>\r\n        <br/>\r\n        <span>";
  if (stack1 = helpers.urlOrDetails) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.urlOrDetails; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\r\n      </div>\r\n      </li>\r\n    <li>\r\n      <div>\r\n        <span>subreddit</span>\r\n        <br/>\r\n        <span>";
  if (stack1 = helpers.subreddit) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.subreddit; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\r\n      </div>\r\n      </li>\r\n    <li>\r\n      <div>\r\n        <span>scheduled time</span>\r\n        <br/>\r\n        <span>"
    + escapeExpression(((stack1 = ((stack1 = depth0.schedule),stack1 == null || stack1 === false ? stack1 : stack1.date)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(((stack1 = ((stack1 = depth0.schedule),stack1 == null || stack1 === false ? stack1 : stack1.time)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\r\n      </div>\r\n    </li>\r\n  </ul>\r\n</div>\r\n";
  return buffer;
  })
return template
});
