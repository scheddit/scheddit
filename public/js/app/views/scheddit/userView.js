// userView.js

define(["jquery", "backbone", "models/scheddit/User", "text!templates/scheddit/user.html", "views/scheddit/postView", "views/scheddit/scheduleView", "views/scheddit/historyView"],

  function($, Backbone, Model, template, PostView, ScheduleView, HistoryView){ //note: we are not passing in postView.html

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
        "change #postType": "displayTextOrLinkForm"
      },

      // function that is triggered when the submit button is pressed
      addToSchedule: function(event){
        //string variable required because element type will depend on kind of submission.
        var element = '';
        //helper funciton to replace '<' and '>' with '&lt' and '&gt' respectivly
        var replaceChars = function(string) {
          var result = string.replace(/</gi,'&lt');
          return result.replace(/>/gi, '&gt');
        };

        var formData = [
          {name: 'kind'},
          {name: 'title'},
          {name: 'subreddit'},
          {name: 'urlOrDetails'},
          {name: 'date'},
          {name: 'time'}
        ];

        var form =$(document).find('form');
        formData[0].value = form.find('select[name=kind] option:selected').val();
        formData[1].value = replaceChars(form.find('input[name=title]').val());
        formData[2].value = replaceChars(form.find('input[name=subreddit]').val());
        if(formData[0].value === 'link') {
          element = 'input';
        } else {
          element = 'textarea';
        }
        formData[3].value = replaceChars(form.find(element+'[name=urlOrDetails]').val());
        formData[4].value = form.find('input[name=date]').val();
        formData[5].value = form.find('input[name=time]').val();

        $.ajax({
          url: "/api/schedule", // the API
          method: "POST",
          data: formData
        })
        .done(function(data){
          console.log('schedule ajax success', data);
          console.log('schedule ajax success');
        })
        .fail(function(err){
          console.log('schedule ajax fail', err);
        });
        return false;
      },

      // Renders the view's template to the UI
      render: function() {
        $(document).find('#user').empty().append('<a href="#user">' + this.name + '</a>');
        this.template = _.template(template, {name: this.name});

        return this.$el.html(this.template);
      },
      displayTextOrLinkForm: function(event){
        var linkOrSelf = event.target.value;
        if (linkOrSelf=== "link"){
          // console.log("link");
          $('#urlOrDetails').replaceWith($('<input name="urlOrDetails" id="urlOrDetails"></input>'));
          $('#urlOrDetails').attr("placeholder", "URL").attr("type", "url");
        }
        else if (linkOrSelf === "self"){
          // console.log("self");
          $('#urlOrDetails').replaceWith($('<textarea name="urlOrDetails" id="urlOrDetails"></textarea>'));
          $('#urlOrDetails').attr("placeholder", "text (optional)").attr("type", "text");
        }
        $('.initialHide').removeClass('initialHide');
        $('.initialCollapse').removeClass('initialCollapse');

      }

    });

    // Returns the View class
    return UserView;
  }
);