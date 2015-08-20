//= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
//
// - DEPENDENCIES
//
//= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

var _ = require('lodash');

var defaultOptions = {
  as: 'copy',
  from: './assets/**/*',
  to: './dist'
};

//= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
//
// - PUBLIC
//
//= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

function init(gulp) {
  return function (opts) {
    opts = _.merge(defaultOptions, opts);

    var task = gulp.task(opts.as, function () {
      return gulp.src(opts.from).pipe(gulp.dest(opts.to));
    });

    gulp.tasks[opts.as].opts = opts;

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
