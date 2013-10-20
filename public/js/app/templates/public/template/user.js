define(['handlebars'], function(handlebars){
var template = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<!-- HTML Template -->\r\n<div class=\"container\">\r\n  <h4 class=\"name\"><em>Welcome ";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "!</em></h4>\r\n  <div class=\"modal-button-holder\">\r\n    <a href=\"#myModal\" id=\"modal-clicker\" role=\"button\" class=\"btn btn-lg btn-primary\" data-toggle=\"modal\">Schedule a new Post</a>\r\n  </div>\r\n  <div id=\"schedule\" class=\"listPosts\"></div>\r\n  <div id=\"history\" class=\"listPosts\"></div>\r\n</div>\r\n";
  return buffer;
  })
return template
});
