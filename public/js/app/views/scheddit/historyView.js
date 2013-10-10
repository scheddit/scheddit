// historyView.js -- this is for historyd posts


define(["jquery", "backbone", "models/scheddit/postModel", "views/scheddit/postView", "text!templates/scheddit/user.html"],

  function($, Backbone, Model, PostView, template){

    var historyView = Backbone.View.extend({
      // View constructor
      initialize: function() {
        this.render();
      },

      // Renders the view's template to the UI
      render: function() {
        return this.$el.html('<h2>History</h2>').append(
          this.collection.map(function(post){
            console.log("history", post);
            if (!post.attributes.isPending){
              return new PostView({model: post}).render();
            } else return;          })
        );
      }
    });

    // Returns the View class
    return historyView;

  }

);