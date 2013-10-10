// historyView.js -- this is for historyd posts


define(["jquery", "backbone", "models/scheddit/Post", "views/scheddit/PostView", "text!templates/scheddit/User.html"],

  function($, Backbone, Model, PostView, template){

    var HistoryView = Backbone.View.extend({
      // View constructor
      initialize: function() {
        this.render();
      },
      // Renders the view's template to the UI
      render: function() {
        return this.$el.html('<h3>History</h3>').append(
          this.collection.map(function(post){
            if (!post.attributes.isPending){
              return new PostView({model: post}).render();
            } else return;
          })
        );
      }
    });
    // Returns the View class
    return HistoryView;
  }
);