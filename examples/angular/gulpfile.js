var gulp = require('gulp');
var lygt = require('lygt').use(gulp);
var config = require('./config/env');
var ngAnnotate = require('browserify-ngannotate');
var tasks = lygt.tasks;

var data = {
  now: Date.now(),
  config: lygt.merge(lygt.env, config)
};

tasks.clear({
  as: 'clean'
});

tasks.html({
  as: 'index',
  preprocess: data
});

tasks.scss({
  as: 'styles',
  minify: data.config.RELEASE,
  output: data.now + '.css',
  preprocess: data,
  sourcemaps: !data.config.RELEASE
});

tasks.browserify({
  as: 'scripts',
  minify: data.config.RELEASE,
  output: data.now + '.js',
  sourcemaps: !data.config.RELEASE,
  transforms: [
    lygt.transforms.preprocess(data),
    lygt.transforms.inject({config: data.config}),
    lygt.transforms.html(),
    ngAnnotate
  ]
});

tasks.serve({
  as: 'serve'
});

gulp.task('watch', function () {
  lygt.watch('scripts');
  lygt.watch('index');
  lygt.watch('styles');
});

gulp.task('build', function (next) {
  lygt.run('clean', ['scripts', 'index', 'styles'], next);
});

gulp.task('default', function (next) {
  lygt.run(['build', 'watch'], 'serve', next);
});
