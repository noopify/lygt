//= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
//
// - DEPENDENCIES
//
//= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

var seq = require('run-sequence'),
  fs = require('fs'),
  util = require('gulp-util'),
  lodash = require('lodash'),
  tasks = require('./tasks'),
  watch = require('./watch');

//= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
//
// - EXPORTS
//
//= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

module.exports = {
  use: function (gulp) {
    delete util.env._;
    return {
      add: function (plugin) {
        plugin.use(gulp, this);
      },
      write: function(path, data) {
        fs.writeFileSync(path, JSON.stringify(data, null, '\t'), 'UTF-8');
        return path;
      },
      util: util,
      env: util.env,
      merge: lodash.merge,
      run: seq.use(gulp),
      tasks: tasks.use(gulp),
      watch: watch.use(gulp)
    };
  }
};
