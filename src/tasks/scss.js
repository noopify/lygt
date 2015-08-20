//= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
//
// - DEPENDENCIES
//
//= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

var _ = require('lodash'),
  path = require('path'),
  gif = require('gulp-if'),
  sass = require('gulp-sass'),
  preprocess = require('gulp-preprocess'),
  sourcemaps = require('gulp-sourcemaps'),
  minify = require('gulp-minify-css'),
  rename = require('gulp-rename'),
  autoprefixer = require('gulp-autoprefixer');

var defaultOptions = {
  as: 'scss',
  minify: false,
  sourcemaps: true,
  autoprefixer: true,
  lint: false,
  from: './src/styles/index.scss',
  to: './dist',
  output: 'app.scss',
  watch: './src/styles/**/*.scss',
  preprocess: {},
  plugins: {
    sass: {
      includePaths: './src'
    },
    sourcemaps: {
      init: {loadMaps: true},
      write: {sourceRoot: '/src/styles'},
      to: './'
    },
    autoprefixer: 'last 2 version',
    minify: {
      processImport: false
    }
  }
};

//= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
//
// - PRIVATE
//
//= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

function findReloadTask(gulp) {
  for (var t in gulp.tasks) {
    if (gulp.tasks.hasOwnProperty(t) && gulp.tasks[t].browserSync) {
      return gulp.tasks[t].browserSync;
    }
  }
  return false;
}

//= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
//
// - PUBLIC
//
//= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

function init(gulp) {
  return function (opts) {
    opts = _.merge(defaultOptions, opts);
    opts.plugins.sourcemaps.write.sourceRoot = path.dirname(opts.from).replace('.', '');

    var task = gulp.task(opts.as, function () {
      var bs = findReloadTask(gulp);

      return gulp.src(opts.from)
        .pipe(gif(opts.sourcemaps, sourcemaps.init(opts.plugins.sourcemaps.init)))
        .pipe(sass(opts.plugins.sass).on('error', sass.logError))
        .pipe(preprocess({context: opts.preprocess}))
        .pipe(rename(opts.output))
        .pipe(gif(opts.autoprefixer, autoprefixer(opts.plugins.autoprefixer)))
        .pipe(gif(opts.minify, minify(opts.plugins.minify)))
        .pipe(gif(opts.sourcemaps, sourcemaps.write(opts.plugins.sourcemaps.to, opts.plugins.sourcemaps.write)))
        .pipe(gulp.dest(opts.to))
        .pipe(gif(bs, bs.stream({match: '**/*.css'})));
    });

    gulp.tasks[opts.as].STYLES = true;
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
