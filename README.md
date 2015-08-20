# ly GulpTasks
### Collection of GulpTasks. (2015-08)

Only for browserify, scss.

```javascript
var gulp = require('gulp');
var lygt = require('lygt').use(gulp);

lygt.browserify({ // Create task 'scripts'
  as: 'scripts',
  from: './src/index.js',
  to: './build'
});

lygt.watch('scripts'); // Enable watchify
```

See `examples/` for more details.
