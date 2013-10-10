// userView.js

define(["jquery", "backbone", "models/scheddit/User", "text!templates/scheddit/User.html", "views/scheddit/PostView", "views/scheddit/ScheduleView", "views/scheddit/HistoryView"],

  function($, Backbone, Model, template, PostView, ScheduleView, HistoryView){ //note: we are not passing in postView.html

    var UserView = Backbone.View.extend({

      // The DOM Element associated with this view
      el: ".magic",

      // View constructor
      initialize: function(data) {
        this.model = new Model(data.user);
        this.posts = new Backbone.Collection(data.posts);
        this.name = this.model.name;
        this.render();

        this.scheduleView = new ScheduleView({
          collection: this.posts,
          el: this.$('#schedule')
        });
        this.historyView =  new HistoryView({
          collection: this.posts,
          el: this.$('#history')
        });
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
        return false;
      },
      // Renders the view's template to the UI
      render: function() {
        $(document).find('#user').text(this.name);
        this.template = _.template(template, {name: this.name});

        return this.$el.html(this.template);
      },
      displayTextOrLinkForm: function(event){
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
    return UserView;
  }
);