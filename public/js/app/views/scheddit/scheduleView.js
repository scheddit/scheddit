// scheduleView.js -- this is for scheduled posts


define(["jquery", "backbone", "models/scheddit/postModel", "collections/scheddit/scheduleCollection", "views/scheddit/postView", "text!templates/scheddit/user.html"],

    function($, Backbone, Model, PostView, Collection, template){

        var scheduleView = Backbone.View.extend({

            // The DOM Element associated with this view
            el: ".schedule",

            // View constructor
            initialize: function() {
                this.render();
            },

            // View Event Handlers
            events: {
                //add delete and edit events
            },

            // Renders the view's template to the UI
            render: function() {
                this.$el.children().detach();

                return this.$el.html('<div class="schedule">Schedule</div>').append(
                  this.Collection.map(function(post){
                    return new PostView({model: post}).render();
                  })
                );

                // Setting the view's template property using the Underscore template method
                // this.template = _.template(template, {title: this.data.title, kind: this.data.kind, urlOrDetails:this.data.urlOrDetails, subreddit: this.data.subreddit, time:this.data.time});

                // // Dynamically updates the UI with the view's template
                // this.$el.html(this.template);

                // // Maintains chainability
                // return this;

            }

        });

        // Returns the View class
        return scheduleView;

    }

);