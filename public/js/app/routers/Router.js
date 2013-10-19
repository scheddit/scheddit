// Router.js

define(["jquery", "underscore", "backbone", "models/scheddit/Scheddit", "views/scheddit/userView", "views/scheddit/schedditView", "models/scheddit/User", "models/scheddit/Post"],

  function($, _, Backbone, Model, UserView, View, User, Post) {

    var Router = Backbone.Router.extend({

      initialize: function() {

        // Tells Backbone to start watching for hashchange events
        Backbone.history.start();

      },

      // All of your Backbone Routes (add more)
      routes: {

        // When there is no hash on the url, the home method is called
        "": "index",
        "user": "user"
        // "/": "index",

      },

      index: function() {

        // Instantiates a new view which will render the header text to the page
        new View();
      },

      user: function() {
        var data = {};
        $.get("/api/userdata").success(function(userdata){
          console.log('in success', userdata);
          data.user = userdata;
          $.get("/api/userposts").success(function(userposts){
            _.each(userposts, function(post){
              post.url = "http://www.reddit.com/r/"+post.subreddit+"/"+post.title;
              post.url.replace(/ /g,"_");
            });
            console.log("posts from server", userposts);
            data.posts = userposts;
            new UserView(data);
          });
          // data.posts = [
          //   {
          //     urlOrDetails: "http://www.google.com",
          //     title: "Data from ROUTER",
          //     subreddit: "testOne",
          //     kind: "link",
          //     isPending: true,
          //     time: "2013-10-17T10:11"
          //   },
          //   {
          //     urlOrDetails: "http://www.aol.com",
          //     title: "Aol is cool",
          //     subreddit: "testTwo",
          //     kind: "link",
          //     isPending: false,
          //     time: "2013-10-17T20:11"
          //   },
          //   {
          //     urlOrDetails: "http://www.google.com",
          //     title: "Data from ROUTER2",
          //     subreddit: "testOne2",
          //     kind: "link",
          //     isPending: true,
          //     time: "2013-10-17T10:11"
          //   },
          //   {
          //     urlOrDetails: "http://www.aol.com",
          //     title: "Aol is cool2",
          //     subreddit: "testTwo2",
          //     kind: "link",
          //     isPending: false,
          //     time: "2013-10-17T20:11"
          //   }
          // ];
        });
      }
    });

    // Returns the DesktopRouter class
    return Router;

  }

);