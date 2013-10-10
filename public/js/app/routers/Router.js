// Router.js

define(["jquery", "backbone", "models/scheddit/schedditModel", "views/scheddit/userView", "views/scheddit/schedditView", "collections/scheddit/schedditCollection", "models/scheddit/userModel", "models/scheddit/postModel"],

    function($, Backbone, Model, userView, View, Collection, userModel, postModel) {

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

            },

            index: function() {

                // Instantiates a new view which will render the header text to the page
                new View();

            },

            user: function(data) {
                // user is called once redirected. Investigate what is being sent in at this point
                // check with the router user: user above

                // from the server we get the user from reddit
                // from mongo we get posts if the user has any throgh scheddit
                // comes in as a response
                console.log("data in user page initial call", data, arguments);
                data = data || {};
                data.user = {name: "Rupa"}; // brute force to send user name with View potentially from server
                data.posts = [{urlOrDetails: "http://www.google.com", title: "Data from ROUTER", subreddit: "testOne", kind: "link", isPending: true, time: "2013-10-17T10:11"}, {urlOrDetails: "http://www.aol.com", title: "Aol is cool", subreddit: "testTwo", kind: "link", isPending: true, time: "2013-10-17T20:11"}];
                new userView(data); // {model: } is this where we pass in model?
            }

        });

        // Returns the DesktopRouter class
        return Router;

    }

);