// Router.js

define(["jquery", "backbone", "models/scheddit/Scheddit", "views/scheddit/UserView", "views/scheddit/SchedditView", "models/scheddit/User", "models/scheddit/Post"],

  function($, Backbone, Model, UserView, View, User, Post) {

    var Router = Backbone.Router.extend({

      initialize: function() {

        // Tells Backbone to start watching for hashchange events
        Backbone.history.start();

      },

      // All of your Backbone Routes (add more)
      routes: {

        // When there is no hash on the url, the home method is called
        "": "index",
        "user": "user",
        "/": "index"

      },

      index: function() {

        // Instantiates a new view which will render the header text to the page
        new View();
      },

      user: function(data) {
        data = data || {};
        data.user = {name: "Rupa"};
        data.posts = [
        {
          urlOrDetails: "http://www.google.com",
          title: "Data from ROUTER",
          subreddit: "testOne",
          kind: "link",
          isPending: true,
          time: "2013-10-17T10:11"
        },
        {
          urlOrDetails: "http://www.aol.com",
          title: "Aol is cool",
          subreddit: "testTwo",
          kind: "link",
          isPending: false,
          time: "2013-10-17T20:11"
        }
      ];
        new UserView(data);
      }

    });

    // Returns the DesktopRouter class
    return Router;

  }

);