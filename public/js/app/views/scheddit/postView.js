// postView.js -- this is for scheduled posts


define(["jquery", "backbone", "models/scheddit/postModel", "text!templates/scheddit/user.html"],

    function($, Backbone, Model, template){

        var userView = Backbone.View.extend({

            // The DOM Element associated with this view
            el: ".post",

            // View constructor
            initialize: function() {
                this.data = {urlOrDetails: "http://www.google.com", title: "data from POSTVIEW", subreddit: "testOne", kind: "link", isPending: true, time: "2013-10-17T10:11"};
                this.render();
            },

            // View Event Handlers
            events: {
                //add delete and edit events
            },

            // Renders the view's template to the UI
            render: function() {

                // Setting the view's template property using the Underscore template method
                this.template = _.template(template, {title: this.data.title, kind: this.data.kind, urlOrDetails:this.data.urlOrDetails, subreddit: this.data.subreddit, time:this.data.time});

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