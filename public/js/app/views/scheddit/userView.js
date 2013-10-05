// userView.js

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
                "click .submitButton": "addToSchedule",
                // listen for change on the "select type of post button", then call jquery function that either displays link or self-post form
                "change #postType": "displayTextOrLinkForm"
            },

            // function that is triggered on button event
            launchOauth: function(){
                // code goes here
                console.log("testing 1, 2, 3");
            },

            // function that is triggered when the submit button is pressed
            addToSchedule: function(event){
                // this will create an array of objets that hold the name and value of the fields
                // data = this.$el.find('form').serializeArray();
                // pass data to the model
                // this.model.saveDataToServer(data) << double check this
                console.log("this.$el.find form", (this.$el.find('form').serializeArray()));
                return false;
            },
            // Renders the view's template to the UI
            render: function() {

                // Setting the view's template property using the Underscore template method
                this.template = _.template(template, {});

                // Dynamically updates the UI with the view's template
                this.$el.html(this.template);

                // Maintains chainability
                return this;

            },

            displayTextOrLinkForm: function(event){
                console.log("listening to form selection change");
                var linkOrSelf = event.target.value;
                if (linkOrSelf=== "link"){
                    console.log("link");
                    $('#urlOrDetails').attr("placeholder", "Enter url to share");
                    $('#urlOrDetails').attr("type", "url");
                }
                else if (linkOrSelf === "self"){
                  console.log("self");
                  $('#urlOrDetails').attr("placeholder", "text (optional)");
                  $('#urlOrDetails').attr("type", "text");
                }
                $('.initialHide').removeClass('initialHide');
                $('.initialCollapse').removeClass('initialCollapse');

            }


        });

        // Returns the View class
        return userView;

    }

);