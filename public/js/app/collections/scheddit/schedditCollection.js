// IndexCollection.js

define(["jquery", "backbone", "models/scheddit/schedditModel"],
  function($, Backbone, Model) {

    // Creates a new Backbone Collection class object
    var schedditCollection = Backbone.Collection.extend({

      // Tells the Backbone Collection that all of it's models will be of type Model (listed up top as a dependency)
      model: Model

    });

    // Returns the Model class
    return schedditCollection;

  }

);