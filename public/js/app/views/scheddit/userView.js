// userView.js

define(["jquery", "backbone", "models/scheddit/User", "templates/user", "views/scheddit/postView", "views/scheddit/scheduleView", "views/scheddit/historyView", "views/scheddit/modalView", "bootstrap"],

  function($, Backbone, Model, template, PostView, ScheduleView, HistoryView, BootstrapModal){

    var UserView = Backbone.View.extend({

      // The DOM Element associated with this view
      el: ".magic",

      // View constructor
      initialize: function(data) {
        console.log(data);
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
        "change #postType": "displayTextOrLinkForm",
        "click #modal-clicker": "displayModal"
      },

      // function that is triggered when the submit button is pressed
      addToSchedule: function(event){
        //string variable required because element type will depend on kind of submission.
        var element = '';

        $.ajax({
          url: "/api/schedule", // the API
          method: "POST",
          data: $('#newPost').serializeArray()
        })
        .done(function(data){
          console.log('schedule ajax success', data);
          var errorCode = $.parseJSON(data);
          console.log(errorCode);
          if (errorCode.error === "BAD_CAPTCHA") {
            // alert the user that we cannot post for them
            // ask andre about handlebars and what's going on with this
            $('#formWarning').toggleClass( "hidden" ).text("You don't have enough Reddit Karma. Currently with Scheddit Beta posting from all accounts is not supported.");
          }
        })
        .fail(function(err){
          console.log('schedule ajax fail', err);
        });

        //clear the form after submission
        $('#postType').prop('selectedIndex',0);
        $(".refresh").val("");
        return false;
      },

      // Renders the view's template to the UI
      render: function() {
        $('#user').addClass('loggedinUser').empty().append('<a href="#user">' + this.name + '</a>');
        var data = {name: this.name, warning: this.warning};
        console.log("warning in render", this.warning);

        return this.$el.html(template(data));
      },

      displayTextOrLinkForm: function(event){
        var linkOrSelf = event.target.value;
        if (linkOrSelf=== "link"){
          // console.log("link");
          $('#urlOrDetails').replaceWith($('<input id="urlOrDetails" name="urlOrDetails"></input>'));
          $('#urlOrDetails').attr("placeholder", "URL").attr("type", "url")
            .addClass('refresh').attr('name','urlOrDetails');
        }
        else if (linkOrSelf === "self"){
          // console.log("self");
          $('#urlOrDetails').replaceWith($('<textarea id="urlOrDetails" name="urlOrDetails"></textarea>'));
          $('#urlOrDetails').attr("placeholder", "text (optional)").attr("type", "text")
            .addClass('refresh').attr('name','urlOrDetails');
        }
        // $('urlOrDetails').addClass('refresh').attr('name','urlOrDetails');
        $('.initialHide').removeClass('initialHide');
        $('.initialCollapse').removeClass('initialCollapse');

      },

      displayModal: function(){
        var modal = new BootstrapModal({
          content: "stuff",
          title: 'What would you like to share today?',
          animate: true
        }).open(function(){console.log("clicked OK");});
      }

    });

    // Returns the View class
    return UserView;
  }
);
