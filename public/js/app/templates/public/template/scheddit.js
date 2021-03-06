define(['handlebars'], function(handlebars){
var template = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<!-- HTML Template -->\r\n<div class=\"container\">\r\n  <div id=\"mainTitles\" class=\"landingTitles\"> \r\n    <h2><strong>Prescheduled reddit posting??</strong></h2>\r\n    <h3>That's right. Welcome to the Karma Factory.</h3>\r\n  </div>\r\n\r\n  <div id='main-container'>\r\n    <div class=\"well\" id=\"howItWorks\">\r\n      <h3 class=\"underlineThis landingTitles\">how it works</h3>\r\n      <ol class='explanation'>\r\n        <li>Sign in with your reddit account.</li>\r\n        <li>Prepare a link or post submission, the same way you would on reddit.</li>\r\n        <li>Schedule the date and time you want it sent.</li>\r\n        <li>?????</li>\r\n        <li>Profit.</li>\r\n      </ol>\r\n    </div>\r\n\r\n    <div class=\"well\" id=\"whoItsFor\">\r\n      <h3 class=\"underlineThis landingTitles\">who it's for</h3>\r\n      <ol class='explanation'>\r\n        <li>Moderators</li>\r\n        <li>Really cool people.</li>\r\n        <li>Everyone who has a brilliant idea for a post at 2AM, but wants more upvotes than the Australians can offer.</li>\r\n      </ol>\r\n    </div>\r\n  </div>\r\n\r\n  <div id='loginButton'>\r\n    <a href=\"/api/login\">\r\n      <img id=\"login-image\" src=\"img/login.png\">\r\n      <div id='login-text'>Sign in with <strong>reddit</strong></div>\r\n    </a>\r\n  </div>\r\n\r\n  <div class=\"well\" id=\"warning\">\r\n    <h4 class=\"landingTitles\"> oh yea...</h4>\r\n    <ol>\r\n      <li><a href=\"http://www.reddit.com/r/scheddit/comments/1ojaz9/just_so_you_know_we_dont_store_your_password_or/\"> We don't store your password (or  have access to it)</a>. You can revoke scheddit's permission anytime.</li>\r\n      <li>Your profile alerts you if a post failed for some reason.</li>\r\n      <li>We have not yet enabled CAPTCHA functionality, but will let you know if that's a problem.</li>\r\n    </ol>\r\n  </div>\r\n</div>\r\n";
  })
return template
});
