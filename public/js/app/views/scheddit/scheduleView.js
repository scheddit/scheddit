// scheduleView.js -- this is for scheduled posts
define(["jquery", "backbone", "models/scheddit/Post", "views/scheddit/schedulePostView", "templates/post"],
  function($, Backbone, Model, PostView, template){

    var ScheduleView = Backbone.View.extend({
      // View constructor
      initialize: function() {
        this.render();
      },

      // Renders the view's template to the UI
      render: function() {
        return this.$el.html('<div class="section-title"><h3>Scheduled Posts</h3></div>').append(
          this.collection.map(function(post){
            if (post.attributes.isPending === 'pending' || post.attributes.isPending === true){
              return new PostView({model: post}).render();
            } else return;
          })
        );
      }
    });

    // Returns the View class
    return ScheduleView;

  }

);
