// postView.js -- this is for scheduled posts

// define(["jquery", "backbone", "models/scheddit/Post", "text!templates/scheddit/post.html"],
define(["jquery", "backbone", "models/scheddit/Post", "templates/template"],

  function($, Backbone, Model, Template){

    var PostView = Backbone.View.extend({
      render: function() {
        this.template = Template['public/template/schedulePost.hbs'];
        var data = this.model.attributes; //TODO: should this be this.model.toJSON()?
        return this.$el.html(this.template(data));
      }
    });
    // Returns the View class
    return PostView;
  }
);