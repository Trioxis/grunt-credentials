/*
 * grunt-credentials
 * 
 *
 * Copyright (c) 2014 Jack Davis
 * Licensed under the MIT license.
 */

'use strict';
var credentialManager = require("../lib/credentialManager.js")

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('credentials', 'The best Grunt plugin ever.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({

    });

    var manager = new credentialManager();

    Object.keys(options.providers).forEach(function(key){
      var provider = options.providers[key];
      provider.name = key;
      
      grunt.verbose.writeln("Found credential provider : "+provider.name);
      manager.addProvider(provider.name,provider.credential,provider.map);
    });

    var config = options.config;
    var credential = options.credential;

    grunt.verbose.writeln("Setting '" + config + "' to '" + credential + "'");

    grunt.config.set(config,manager.getCredential(options.credential))
  });

};
