var gulp = require('gulp');
var lygt = require('../src').use(gulp);
var tasks = lygt.tasks;

tasks.clear({

});

tasks.html({

});

tasks.scss({

});

tasks.browserify({
  transforms: [
    lygt.transforms.html()
  ]
});

tasks.serve({

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
