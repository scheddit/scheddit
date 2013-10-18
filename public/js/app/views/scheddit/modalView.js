// modalView.js -- this is for the modal that pops up content over the userView

define(["jquery", "backbone", "models/scheddit/Post", "templates/modalForm"],

  function($, Backbone, Model, template){

    var ModalView = Backbone.View.extend({
      template: template,

      // View Event Handlers
      events: {
        // write an event that is triggered when the button is clicked and calls a function that launches oAuth
        "click .submitButton": "addToSchedule",
        // listen for change on the "select type of post button", then call jquery function that either displays link or self-post form
        "change #postType": "displayTextOrLinkForm"
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

      render: function() {
        this.$el.html(this.template);
        console.log('modal rendered');
        return this;
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

      }
    });
    // Returns the View class
    return ModalView;
  }
);