var gulp = require('gulp');
var lygt = require('lygt').use(gulp);
var tasks = lygt.tasks;

tasks.html();
tasks.serve();

tasks.browserify({
  from: './src/scripts/index.js',
  to: './dist',
  transforms: [
    ['reactify', {es6: true}]
  ]
});

gulp.task('watch', function () {
  lygt.watch('browserify');
});

gulp.task('default', function () {
  lygt.run(['html', 'browserify', 'watch'], 'serve');
});
