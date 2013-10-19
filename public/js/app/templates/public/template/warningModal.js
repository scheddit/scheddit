define(['handlebars'], function(handlebars){
var template = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<!-- HTML Template -->\r\n<div class=\"modal-holder\">\r\n  <form id=\"newPost\" name=\"submission\"class=\"initialCollapse\">\r\n    <div class=\"modal-header\">\r\n      <a class=\"close\">&times;</a>\r\n      <h4>";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h4>\r\n    </div>\r\n    <div class=\"modal-body\">\r\n        <p>Sorry you do not have enough Reddit Karma to use Scheddit Beta.</p>\r\n    </div>\r\n    <div class=\"modal-footer\">\r\n      <a href=\"#\" class=\"btn cancel\">";
  if (stack1 = helpers.cancelText) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.cancelText; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</a>\r\n      <a href=\"#\" class=\"btn ok btn-primary\">";
  if (stack1 = helpers.okText) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.okText; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</a>\r\n    </div>\r\n  </form>\r\n</div>";
  return buffer;
  })
return template
});
