define(['handlebars'], function(handlebars){
var template = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<!-- HTML Template -->\r\n<div style=\"height:80px\"></div>\r\n\r\n<div class=\"container\">\r\n  <h4 class=\"name\"><em>Welcome ";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "!</em></h4>\r\n\r\n  <a href=\"#myModal\" id=\"modal-clicker\" role=\"button\" class=\"btn\" data-toggle=\"modal\">Schedule a new Post</a>\r\n\r\n  <div class=\"toShareForm\">\r\n    <h3 class=\"underline\"> What would you like to share today? </h3>\r\n    <form id=\"newPost\" name=\"submission\"class=\"initialCollapse\">\r\n      <select name=\"kind\" id=\"postType\" class=\"btn dropdown-toggle initialHide\">\r\n        <option selected=\"selected\">Select a type of post</option>\r\n        <option value=\"link\">Link</option>\r\n        <option value=\"self\">Self-Post</option>\r\n      </select>\r\n      <br/>\r\n      <div id=\"formWarning\" class=\"alert-block alert alert-error hidden\">";
  if (stack1 = helpers.warning) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.warning; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>\r\n      <input name=\"title\" id=\"postTitle\" type=\"text\" placeholder=\"title\" class=\"refresh initialHide\"></input>\r\n      <br/>\r\n      <input name=\"subreddit\" id=\"postSubreddit\" type=\"text\" placeholder=\"choose a subreddit\" class=\"refresh initialHide\"></input>\r\n      <br/>\r\n      <input name=\"urlOrDetails\" id=\"urlOrDetails\" type=\"url\" placeholder=\"URL or text\" class=\"refresh initialHide\"></input>\r\n      <br/>\r\n      <input type=\"date\" id=\"postDate\" name=\"date\" class=\"refresh initialHide\"></input>\r\n      <br/>\r\n      <input type=\"time\" id=\"postTime\" name=\"time\" class=\"refresh initialHide\"></input>\r\n      <br/>\r\n      <input type=\"submit\" name=\"submitButton\" class=\"submitButton initialHide\"></input>\r\n    </form>\r\n  </div>\r\n  <div id=\"schedule\" class=\"listPosts\"></div>\r\n  <div id=\"history\" class=\"listPosts\"></div>\r\n</div>\r\n";
  return buffer;
  })
return template
});
