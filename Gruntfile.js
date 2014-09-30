/*
 * grunt-credentials
 * 
 *
 * Copyright (c) 2014 Jack Davis
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    options:{
      testDefaults:{
        "cred1":"foo",
        "cred2":"bar"
      }
    },
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/**/*.js',
        'lib/**/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    credentials:{
      options:{
        providers:[
          {
            name:"aws-credentials",
            credential:"<%= options.testDefaults %>",
            map:{
              "my-cred1":"cred1",
              "my-cred2":"cred2"
            }
          },
          {
            name:"inline",
            credential:function(val){
              grunt.log.writeln(val);
              return grunt.option(val);
            },
            map:{
              "my-cred1":"cred1",
              "my-cred2":"cred2"
            }
          }
        ]
      },
      cred1:{
        options:{
          config:"options.credentials.my-cred1",
          credential:"my-cred1"
        }
      },
      cred2:{
        options:{
          config:"options.credentials.my-cred2",
          credential:"my-cred2"
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'credentials', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
