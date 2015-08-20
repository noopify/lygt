var gulp = require('gulp');
var lygt = require('lygt').use(gulp);
var tasks = lygt.tasks;

tasks.clear({
  as: 'clean'
});

tasks.copy();

tasks.html({
  as: 'index'
});

tasks.browserify({
  as: 'scripts',
  from: './src/index.js'
});

tasks.serve({
  as: 'serve'
});

gulp.task('watch', function () {
  lygt.watch('scripts');
  lygt.watch('copy');
});

gulp.task('build', function (next) {
  lygt.run('clean', ['scripts', 'index', 'copy'], next);
});

gulp.task('default', function (next) {
  lygt.run(['build', 'watch'], 'serve', next);
});
