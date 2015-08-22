# ly GulpTasks
### Collection of GulpTasks. (2015-08)

Only for browserify, scss.

```javascript
var gulp = require('gulp');
var lygt = require('lygt').use(gulp);
var tasks = lygt.tasks;

tasks.browserify({ // Create task `browserify`
  from: './src/index.js',
  to: './dist'
});

gulp.task('watch', function() {
  lygt.watch('browserify'); // Enable watchify
});

gulp.task('default', ['browserify', 'watch']);
```

See `examples/` for more details.
