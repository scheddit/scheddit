module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    concurrent: {
      target: {
        tasks: ['nodemon:dev', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },

    nodemon: {
      dev: {
        options: {
          file: 'server/server.js',
          args: ['dev'],
          ignoredFiles: ['README.md', 'node_modules/**'],
          watchedExtensions: ['js'],
          watchedFolders: ['tests','server'],
          debug: true,
          delayTime: 1,
          env: {
            PORT: '1337'
          },
          cwd: __dirname
        }
      }
    },

    watch: {
      scripts: {
        files: ['public/css/**/*.styl', 'public/template/*.hbs'],
        tasks: ['stylus', 'handlebars_requirejs'],
        options: {
          livereload: true
        }
      }
    },

    requirejs: {
      mainJS: {
        options: {
          baseUrl: "public/js/",
          paths: {
            "main": "app/config/Init"
          },
          wrap: true,
          name: "libs/almond/almond",
          preserveLicenseComments: false,
          optimize: "uglify",
          mainConfigFile: "public/js/app/config/Init.js",
          include: ["main"],
          out: "public/js/app/config/Init.min.js"
        }
      },
      mainCSS: {
        options: {
          optimizeCss: "standard",
          cssIn: "./public/css/app.css",
          out: "./public/css/app.min.css"
        }
      }
    },

    jshint: {
      files: ['Gruntfile.js'],
      // files: ['Gruntfile.js', 'public/js/app/**/*.js', '!public/js/app/**/*min.js'],
      options: {
        globals: {
          jQuery: true,
          console: false,
          module: true,
          document: true
        }
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['server/tests/**/*.js']
      }
    },

    shell: {
      copyBootstrapCSS: {
        command: 'cp ./public/js/libs/bootstrap/dist/css/bootstrap.css ./public/css/bootstrap.css'
      },
      copyFontAwesomeCSS: {
        command: 'cp ./public/js/libs/font-awesome/css/font-awesome.css ./public/css/font-awesome.css && cp ./public/js/libs/font-awesome/css/font-awesome-ie7.css ./public/css/font-awesome-ie7.css'
      },
      copyFontAwesomeFonts: {
        command: 'cp -r ./public/js/libs/font-awesome/font/* ./public/font'
      }
    },

    stylus: {
      compile: {
        options: {
          paths: ["public/css"]
        },

        files: {
          "public/css/includes/css/custom.css": "public/css/includes/stylus/custom.styl" // 1:1 compile
        }
      }
    },

    handlebars_requirejs: {
      basic: {
        files: {
          // folder : files
          // files will be converted into modules and dumped into the folder
          'public/js/app/templates/': 'public/template/*.hbs'
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-handlebars-requirejs');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('test', ['jshint', 'mochaTest' ]);
  grunt.registerTask('init', ['shell:copyBootstrapCSS', 'shell:copyFontAwesomeCSS', 'shell:copyFontAwesomeFonts', 'requirejs:mainJS', 'requirejs:mainCSS']);
  grunt.registerTask('build', ['requirejs:mainJS', 'requirejs:mainCSS']);
  grunt.registerTask('server', ['concurrent']);
  grunt.registerTask('default', ['init', 'test', 'build']);

};
