// TestInit.js

require.config({

  // Sets the js folder as the base directory for all future relative paths
  baseUrl: "./js",

  // 3rd party script alias names (Easier to type "jquery" than "libs/jquery, etc")
  // probably a good idea to keep version numbers in the file names for updates checking
  paths: {

      // Core Libraries
      // ==============

      "jquery": "libs/jquery/jquery",

      "lodash": "libs/lodash/lodash",

      "backbone": "libs/backbone/backbone",

      "bootstrap": "libs/bootstrap/dist/js/bootstrap",

      "jasmine": "libs/jasmine/lib/jasmine-core/jasmine",

      "jasmine-html": "libs/jasmine/lib/jasmine-core/jasmine-html",

      // Plugins
      // =======

      "backbone.validateAll": "libs/plugins/Backbone.validateAll",

      "text": "libs/text/text",

      "jasmine-jquery": "libs/jasmine-jquery/lib/jasmine-jquery",

      // Application Folders
      // ===================

      "collections": "app/collections",

      "models": "app/models",

      "routers": "app/routers",

      "templates": "app/templates",

      "views": "app/views"

  },

  // Sets the configuration for your third party scripts that are not AMD compatible
  shim: {

      // Jasmine-jQuery plugin
      "jasmine-jquery": ["jquery"],

      // Backbone
      "backbone": {

          // Lists jQuery and Underscore as dependencies
          "deps": ["lodash", "jquery"],

          // Exports the global 'window.Backbone' object
          "exports": "Backbone"

      },

      "bootstrap": ["jquery"],

      // Backbone.validateAll depends on Backbone
      "backbone.validateAll": ["backbone"],

      // Jasmine Unit Testing
      "jasmine": {

        // Exports the global 'window.jasmine' object
        "exports": "jasmine"

      },

      // Jasmine Unit Testing helper
      "jasmine-html": {

        "deps": ["jasmine"],

        "exports": "jasmine"

      }

  }

});

// Include JavaScript files here (or inside of your router)
require(["jquery", "backbone", "jasmine-html", "backbone.validateAll"],

  function($, Backbone, jasmine) {

    specs = [];
 
    specs.push('tests/specs/spec');
 
 
    $(function() {
    
      require(specs, function() {

        jasmine.getEnv().addReporter(new jasmine.TrivialReporter());

        jasmine.getEnv().execute();

    
      });

    });

  }

);