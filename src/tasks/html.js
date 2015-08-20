//= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
//
// - DEPENDENCIES
//
//= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

var _ = require('lodash'),
  gif = require('gulp-if'),
  preprocess = require('gulp-preprocess'),
  rename = require('gulp-rename'),
  minify = require('gulp-minify-html');

var defaultOptions = {
  as: 'html',
  from: './src/index.html',
  to: './dist',
  output: false,
  preprocess: {},
  minify: true,
  plugins: {
    minify: {}
  }
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
      return gulp.src(opts.from)
        .pipe(gif(opts.output !== false, rename(opts.output)))
        .pipe(preprocess({context: opts.preprocess}))
        .pipe(gif(opts.minify, minify(opts.plugins.minify)))
        .pipe(gulp.dest(opts.to));
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
