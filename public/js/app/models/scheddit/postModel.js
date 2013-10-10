// postModel.js - for scheduled posts

define(["jquery", "backbone"],

    function($, Backbone) {

        // Creates a new Backbone Model class object
        var postModel = Backbone.Model.extend({

            url: '/post', //relative URL where model's resource is


            // Model Constructor
            initialize: function() {

            },

            // Default values for all of the Model attributes
            defaults: {urlOrDetails: "http://www.aol.com", title: "Google is cool", subreddit: "testOne", kind: "link", isPending: true, time: "2013-10-17T10:11"}

        });

        // Returns the Model class
        return postModel;

    }

);
