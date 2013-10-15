// postView.js -- this is for scheduled posts

define(["jquery", "backbone", "models/scheddit/Post", "text!templates/scheddit/post.html"],

  function($, Backbone, Model, template){

    var PostView = Backbone.View.extend({
      render: function() {
        this.template = _.template(template, this.model.attributes);
        return this.$el.html(this.template);
      }
    });
    // Returns the View class
    return PostView;
  }
);