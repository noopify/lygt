//= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
//
// - DEPENDENCIES
//
//= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

var seq = require('run-sequence'),
  util = require('gulp-util'),
  lodash = require('lodash'),
  tasks = require('./tasks'),
  transforms = require('./transforms'),
  watch = require('./watch');

//= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
//
// - EXPORTS
//
//= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

module.exports = {
  use: function (gulp) {
    return {
      util: util,
      env: util.env,
      merge: lodash.merge,
      run: seq.use(gulp),
      tasks: tasks.use(gulp),
      watch: watch.use(gulp),
      transforms: transforms
    };
  }
};
