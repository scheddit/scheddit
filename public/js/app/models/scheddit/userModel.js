// IndexModel.js

define(["jquery", "backbone"],

    function($, Backbone) {

        // Creates a new Backbone Model class object
        var userModel = Backbone.Model.extend({

            url: '',

            // Model Constructor
            initialize: function() {

            },

            // Default values for all of the Model attributes
            defaults: {
                kind:"",
                title:"",
                subreddit:"",
                URL:"",
                selfPost:"",
                scheduler:""
            },

            // Gets called automatically by Backbone when the set and/or save methods are called (Add your own logic)
            validate: function(attrs) {

            },
            saveToTheServer: function(data){
              var newPost = {};
              for (var key in data){ // data is arr of obj
                var name = data[key]["name"];
                var val = data[key]["value"];
                newPost[name] =val;
              }
              //NEED to save newPost to model server
              //this is where we stopped for the day!
            }

        });

        // Returns the Model class
        return userModel;

    }

);
