// historyView.js -- this is for historyd posts
define(["jquery", "backbone", "models/scheddit/Post", "views/scheddit/postView", "templates/post"],

  function($, Backbone, Model, PostView, template){

    var HistoryView = Backbone.View.extend({
      // View constructor
      initialize: function() {
        this.render();
      },
      // Renders the view's template to the UI
      render: function() {
        return this.$el.html('<div class="section-title"><h3>Post History - Posts from Scheddit</h3></div>').append(
          this.collection.map(function(post){
            if (post.attributes.isPending === 'sent' || post.attributes.isPending === false){
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
