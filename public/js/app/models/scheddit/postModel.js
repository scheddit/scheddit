// postModel.js - for scheduled posts

define(["jquery", "backbone"],

    function($, Backbone) {

        // Creates a new Backbone Model class object
        var postModel = Backbone.Model.extend({

            url: '/post', //relative URL where model's resource is


            // Model Constructor
            initialize: function() {

            },

            defaults: {
                name:"",
                kind:"",
                title:"",
                subreddit:"",
                urlOrDetails:"",
                selfPost:"",
                isPending: true,
                time:""
            }
        });

        // Returns the Model class
        return postModel;

    }

);
