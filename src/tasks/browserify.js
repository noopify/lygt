//= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
//
// - DEPENDENCIES
//
//= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

var _ = require('lodash'),
  gif = require('gulp-if'),
  gutil = require('gulp-util'),
  sourcemaps = require('gulp-sourcemaps'),
  minify = require('gulp-uglify'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  browserify = require('browserify');

var defaultOptions = {
  as: 'browserify',
  minify: false,
  sourcemaps: true,
  from: './src/scripts/index.js',
  to: './dist',
  output: 'app.js',
  transforms: [],
  before: null,
  plugins: {
    browserify: {
      entries: ['./src/scripts/index.js'],
      debug: true,
      cache: {},
      packageCache: {}
    },
    minify: {},
    sourcemaps: {
      init: {loadMaps: true},
      write: {sourceRoot: '/'},
      to: './'
    }
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
    opts.plugins.browserify = _.merge(opts.plugins.browserify, {
      entries: _.isArray(opts.from) ? opts.from : [opts.from],
      debug: opts.sourcemaps
    });

    var stream = browserify(opts.plugins.browserify).on('log', gutil.log);

    if (_.isFunction(opts.before)) {
      opts.before(stream);
    }

    _.forEach(opts.transforms, function (t) {
      stream.transform(t);
    });

    var task = gulp.task(opts.as, function () {
      return stream.bundle()
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source(opts.output))
        .pipe(buffer())
        .pipe(gif(opts.sourcemaps, sourcemaps.init(opts.plugins.sourcemaps.init)))
        .pipe(gif(opts.minify, minify(opts.plugins.minify)))
        .pipe(gif(opts.sourcemaps, sourcemaps.write(opts.plugins.sourcemaps.to, opts.plugins.sourcemaps.write)))
        .pipe(gulp.dest(opts.to));
    });

    gulp.tasks[opts.as].opts = opts;
    gulp.tasks[opts.as].browserify = stream;

    return task;
  };
}

//= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
//
// - EXPORTS
//
//= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

module.exports = {
  init: init
};
