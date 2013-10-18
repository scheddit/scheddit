// postView.js -- this is for scheduled posts

define(["jquery", "backbone", "models/scheddit/Post", "templates/schedulePost"],

  function($, Backbone, Model, template){

    var PostView = Backbone.View.extend({
      render: function() {
        var data = this.model.attributes; //TODO: should this be this.model.toJSON()?
        return this.$el.html(template(data));
      }
    });
    // Returns the View class
    return PostView;
  }
);
