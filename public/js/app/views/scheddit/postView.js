// postView.js -- this is for scheduled posts


define(["jquery", "backbone", "models/scheddit/postModel", "text!templates/scheddit/post.html"],

  function($, Backbone, Model, template){

    var postView = Backbone.View.extend({
      // Renders the view's template to the UI
      render: function() {
        console.log('hey!');
        // Setting the view's template property using the Underscore template method
        // this.template = _.template(template, {title: this.model.title});

        // Setting the view's template property using the Underscore template method
        console.log(this.model.attributes);

        // this.template = _.template(template, {title: this.title, kind: this.kind, urlOrDetails:this.urlOrDetails, subreddit: this.subreddit, time:this.time});
        this.template = _.template(template, this.model.attributes);


        // Dynamically updates the UI with the view's template
        // this.$el.html(this.template);
        // console.log("inside of postView", this.model);
        // Maintains chainability
        // return this;
        // return this.$el.html(this.template);
        return this.$el.html(this.template);
      }
    });

    // Returns the View class
    return postView;

  }

);