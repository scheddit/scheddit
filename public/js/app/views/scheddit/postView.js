// postView.js -- this is for scheduled posts


define(["jquery", "backbone", "models/scheddit/postModel", "text!templates/scheddit/user.html"],

    function($, Backbone, Model, template){

        var userView = Backbone.View.extend({

            // The DOM Element associated with this view
            el: ".post",

            // View Event Handlers
            events: {
                //add delete and edit events
            },

            // Renders the view's template to the UI
            render: function() {

                // Setting the view's template property using the Underscore template method
                this.template = _.template(template, {this.model.attributes});

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