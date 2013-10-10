// userView.js

define(["jquery", "backbone", "models/scheddit/userModel", "text!templates/scheddit/user.html", "views/scheddit/postView", "views/scheddit/scheduleView", "views/scheddit/historyView"],

  function($, Backbone, Model, template, PostView, scheduleView, historyView){ //note: we are not passing in postView.html

    var userView = Backbone.View.extend({

      // The DOM Element associated with this view
      el: ".magic",
      // model: Model,

      // View constructor
      initialize: function(data) {
        // this.user = new Model(data.user); //dynamically set userModel w/ name
        // console.log('user from uV', data.user);
        this.model = new Model(data.user);
        console.log('model', this.model);
        // console.log('user', this.user.get('name'));
        this.posts = data.posts;
        // console.log(this.posts);
        // this.post = new PostView(); // pass in a collection here
        //this.user.get('name') check this
        this.name = this.model.name;
        // Calls the view's render method
        this.render();

        // this.post.render(); // What are we doing here.
         // console.log(this.post.render());
      },

      // View Event Handlers
      events: {
        // write an event that is triggered when the button is clicked and calls a function that launches oAuth
        "click .submitButton": "addToSchedule",
        // listen for change on the "select type of post button", then call jquery function that either displays link or self-post form
        "change #postType": "displayTextOrLinkForm"
      },

      // function that is triggered when the submit button is pressed
      addToSchedule: function(event){
        // this will create an array of objets that hold the name and value of the fields
        // data = this.$el.find('form').serializeArray();
        // pass data to the model
        // this.model.saveDataToServer(data) << double check this
        $.ajax({
          url: "/schedule", // the API
          method: "POST",
          data: this.$el.find('form').serializeArray()
        })
        .done(function(data){
          console.log('schedule ajax success', data);
        })
        .fail(function(err){
          console.log('schedule ajax fail', err);
        });
        // console.log("this.$el.find form", (this.$el.find('form').serializeArray()));
        return false;
      },
      // Renders the view's template to the UI
      render: function() {
        // example from myTunes
        this.template = _.template(template, {name: this.name,
          schedule: new scheduleView({collection: this.posts}).render(), history: new historyView({collection: this.posts}).render()
        });

        return this.$el.html(this.template);

        //var post = this.post;
        //console.log(post);
        // Setting the view's template property using the Underscore template method
        // this.template = _.template(template, {name: this.user.attributes.name, post: "testing"});

        // // hacked solution?::
        // this.$el.html(this.template);
        // //this.$el.find(".post").append(this.post.$el);
        // //this.post.render();
        // // Maintains chainability
        // return this;

      },

      displayTextOrLinkForm: function(event){
        console.log("listening to form selection change");
        var linkOrSelf = event.target.value;
        if (linkOrSelf=== "link"){
          console.log("link");
          $('#urlOrDetails').attr("placeholder", "Enter url to share");
          $('#urlOrDetails').attr("type", "url");
        }
        else if (linkOrSelf === "self"){
          console.log("self");
          $('#urlOrDetails').attr("placeholder", "text (optional)");
          $('#urlOrDetails').attr("type", "text");
        }
        $('.initialHide').removeClass('initialHide');
        $('.initialCollapse').removeClass('initialCollapse');

      }


    });

    // Returns the View class
    return userView;

  }

);