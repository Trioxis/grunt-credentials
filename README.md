# grunt-credentials

> The best Grunt plugin ever.

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-credentials --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-credentials');
```

## The "credentials" task

### Overview
In your project's Gruntfile, add a section named `credentials` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  credentials: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.providers
Type: `Object`
Default value: `Undefined`

An object containing mutliple providers. grunt-credentials uses providers to retrieve requested credential. A provider object typically looks like this:

```js
providers:{
  "my-provider":{
    credentials:{"usr":"joeBlogs"}, //An object that contains your credentials
    map:{ "github-username":"usr" } //An object that maps the provider's credential key to a standard key that you can specify. In this example, "github-username"
  }
}
```

#### options.config
Type: `String`
Default value: `Undefined`

The path to the grunt config to set. When this task is called, grunt-credentials overwrites this grunt config item.


#### options.expand
Type: `Boolean`
Default value: `False`

Expand is used to create an object within the specified config. If you're map is "amazing-username" and your config is "options.stackoverflow" then the grunt config item that will be set is `options.stackoverflow.amazing-username`.

This is useful if you have multiple maps, as grunt-credentials will set all your mapped items to the specified config.

### Usage Examples

#### Single credentials
In this example, single grunt config items are set to the specified credentials

```js
credentials:{
  options:{
    providers:{
      "grunt-defaults":{
        credentials:"<%= options.testDefaults %>",
        map:{
          "my-cred1":"cred1",
          "my-cred2":"cred2"
        }
      },
      "grunt-options":{
        credentials:function(val){
          grunt.log.writeln(val);
          return grunt.option(val);
        },
        map:{
          "my-cred1":"cred1",
          "my-cred2":"cred2"
        }
      }
    }
  },
  cred1:{
    options:{
      config:"options.my-credentials.my-cred1",
      credential:"my-cred1"
    }
  },
  cred2:{
    options:{
      config:"options.my-credentials.my-cred2",
      credential:"my-cred2"
    }
  },
}

//grunt.config("options.my-credentials") ==
//{
//  "my-cred1":"foo",
//  "my-cred2":"bar"
//}
```

#### Expanding credentials
In this example, grunt-config will expand the configuration using the mapping specified

```js
credentials:{
  complexMap:{
    options:{
      providers:{
        "grunt-defaults":{
          credentials:"<%= options.testDefaults %>",
          map:{
            "my-cred1":"cred1",
            "my-cred2":"cred2"
          }
        }
      },
      config:"options.my-credentials",
      expand:true
    }
  }
}

//grunt.config("options.my-credentials") ==
//{
//  "my-cred1":"foo",
//  "my-cred2":"bar"
//}
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
