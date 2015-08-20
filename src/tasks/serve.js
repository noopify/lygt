//= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
//
// - DEPENDENCIES
//
//= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

var _ = require('lodash'),
  browserSync = require('browser-sync').create();

var defaultOptions = {
  as: 'serve',
  notify: false,
  open: true,
  server: './dist'
};

//= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
//
// - PUBLIC
//
//= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

function init(gulp) {
  return function (opts) {
    opts = _.merge(defaultOptions, opts);

    gulp.task(opts.as + '-reload', function () {
      return browserSync.reload();
    });

    var task = gulp.task(opts.as, function () {
      return browserSync.init(opts);
    });

    gulp.tasks[opts.as].opts = opts;
    gulp.tasks[opts.as].browserSync = browserSync;

    return task;
  }
}

//= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
//
// - EXPORTS
//
//= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

module.exports = {
  init: init
};
