// UserModel.js

define(["jquery", "backbone"],

    function($, Backbone) {

        // Creates a new Backbone Model class object
        var userModel = Backbone.Model.extend({

            url: 'user', //relative URL where model's resource is


            // Model Constructor
            initialize: function() {

            },

            // Default values for all of the Model attributes
            defaults: {
                name:""
            },

        });

        // Returns the Model class
        return userModel;

    }

);
