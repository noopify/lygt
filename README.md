### Collection of GulpTasks for browserify project.

Provides commons gulp tasks:

- browserify
- clear
- copy
- html
- scss
- serve

With `watch` support.

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
