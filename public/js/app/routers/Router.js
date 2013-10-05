// Router.js

define(["jquery", "backbone", "models/scheddit/schedditModel", "views/scheddit/userView", "views/scheddit/schedditView", "collections/scheddit/schedditCollection"],

    function($, Backbone, Model, userView, View, Collection) {

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

            user: function() {

                console.log("Router.routes calling scheddit");
                new userView();
            }

        });

        // Returns the DesktopRouter class
        return Router;

    }

);