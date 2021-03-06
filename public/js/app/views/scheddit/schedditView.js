// IndexView.js

define(["jquery", "backbone", "models/scheddit/Scheddit", "templates/scheddit"],
  function($, Backbone, Model, template){
    var SchedditView = Backbone.View.extend({
      // The DOM Element associated with this view
      el: ".magic",
      // View constructor
      initialize: function() {
        // Calls the view's render method
        this.render();
      },
      // View Event Handlers
      events: {
        // write an event that is triggered when the button is clicked and calls a function that launches oAuth
        "click .reddit": "launchOauth"
      },
      // function that is triggered on button event
      launchOauth: function(){
        $.ajax({
          url: "/api/login",
          method: "GET"
        })
        .done(function(data){
          console.log('ajax success', data);
        })
        .fail(function(err){
          console.log('ajax fail', err);
        });
      },
      // Renders the view's template to the UI
      render: function() {
        // Dynamically updates the UI with the view's template
        this.$el.html(template);
        // Maintains chainability
        return this;
      }
    });
    // Returns the View class
    return SchedditView;
  }
);
