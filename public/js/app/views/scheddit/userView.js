// IndexView.js

define(["jquery", "backbone", "models/scheddit/userModel", "text!templates/scheddit/user.html"],

    function($, Backbone, Model, template){

        var userView = Backbone.View.extend({

            // The DOM Element associated with this view
            el: ".magic",

            // View constructor
            initialize: function() {

                // Calls the view's render method
                this.render();

            },

            // View Event Handlers
            events: {
                // write an event that is triggered when the button is clicked and calls a function that launches oAuth
                "click .reddit": "launchOauth"
            },

            // function that is triggered on button event
            launchOauth: function(){
                // code goes here
                console.log("testing 1, 2, 3");
            },

            // Renders the view's template to the UI
            render: function() {

                // Setting the view's template property using the Underscore template method
                this.template = _.template(template, {});

                // Dynamically updates the UI with the view's template
                this.$el.html(this.template);

                // Maintains chainability
                return this;

            }

        });

        // Returns the View class
        return userView;

    }

);