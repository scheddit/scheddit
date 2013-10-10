// historyView.js -- this is for historyd posts


define(["jquery", "backbone", "models/scheddit/postModel", "views/scheddit/postView", "text!templates/scheddit/user.html"],

  function($, Backbone, Model, PostView, template){

    var historyView = Backbone.View.extend({
      // View constructor
      initialize: function() {
        this.render();
      },

      // View Event Handlers
      events: {
        //add delete and edit events
      },

      // Renders the view's template to the UI
      render: function() {
        return this.$el.html('<h2>History</h2>').append(
          this.collection.map(function(post){
          return new PostView({model: post}).render();
          })
        );

        // Setting the view's template property using the Underscore template method
        // this.template = _.template(template, {title: this.data.title, kind: this.data.kind, urlOrDetails:this.data.urlOrDetails, subreddit: this.data.subreddit, time:this.data.time});

        // // Dynamically updates the UI with the view's template
        // this.$el.html(this.template);

        // // Maintains chainability
        // return this;

      }

    });

    // Returns the View class
    return historyView;

  }

);