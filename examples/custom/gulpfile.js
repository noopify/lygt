var gulp = require('gulp');
var lygt = require('../src').use(gulp);
var tasks = lygt.tasks;

var indexHTML = './src/index.html';
var indexJS = './src/index.js';
var indexSCSS = './src/a.scss';

var assets = './assets/**/*';

var dist = './dist';

var data = {
  KEY: Date.now(),
  DEBUG: false
};

tasks.clear({
  from: dist
});

tasks.copy({
  from: assets,
  to: dist
});

tasks.html({
  from: indexHTML,
  to: dist,
  preprocess: data
});

tasks.scss({
  from: indexSCSS,
  to: dist,
  watch: './src/**/*.scss',
  output: data.KEY + '.css',
  preprocess: data
});

tasks.browserify({
  from: indexJS,
  to: dist,
  output: data.KEY + '.js',
  transforms: [
    lygt.transforms.preprocess(data),
    lygt.transforms.inject(data),
    lygt.transforms.html()
  ]
});

tasks.serve({
  server: dist
});

gulp.task('watch', function () {
  lygt.watch('browserify');
  lygt.watch('html');
  lygt.watch('scss');
});

gulp.task('build', function (next) {
  lygt.run('clear', ['browserify', 'html', 'scss'], next);
});

gulp.task('default', function (next) {
  lygt.run(['build', 'watch'], 'serve', next);
});
