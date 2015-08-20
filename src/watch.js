//= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
//
// - DEPENDENCIES
//
//= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

var _ = require('lodash'),
  seq = require('run-sequence'),
  watchify = require('watchify');

//= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
//
// - PRIVATE
//
//= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

function haveReload(gulp) {
  for (var t in gulp.tasks) {
    if (gulp.tasks.hasOwnProperty(t) && gulp.tasks[t].browserSync) {
      return t;
    }
  }
  return false;
}

//= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
//
// - PUBLIC
//
//= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

function use(gulp) {
  var run = seq.use(gulp);

  return function watch(string, tasks) {
    if (gulp.tasks[string]) {
      if (!tasks) {
        tasks = [string];
        var r = haveReload(gulp);
        if (_.isString(r) && !gulp.tasks[string].STYLES) {
          tasks.push(r + '-reload');
        }
      }
      if (gulp.tasks[string].browserify) {
        return watchify(gulp.tasks[string].browserify).on('update', function () {
          run.apply(run, tasks);
        });
      }
      return gulp.watch(gulp.tasks[string].opts.watch || gulp.tasks[string].opts.from, function () {
        run.apply(run, tasks);
      });
    }
    return gulp.watch(string, function () {
      run.apply(run, tasks);
    });
  };
}

//= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
//
// - EXPORTS
//
//= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

module.exports = {
  use: use
};
