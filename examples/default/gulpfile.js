var gulp = require('gulp');
var lygt = require('lygt').use(gulp);
var tasks = lygt.tasks;

tasks.clear({
  as: 'clear',
  from: './dist'
});

tasks.copy({
  as: 'copy',
  from: './assets/**/*',
  to: './dist'
});

tasks.html({
  as: 'html',
  from: './src/index.html',
  to: './dist',
  output: false,
  preprocess: {},
  minify: true,
  plugins: {
    minify: {}
  }
});

tasks.browserify({
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
});

tasks.scss({
  as: 'scss',
  minify: false,
  sourcemaps: true,
  autoprefixer: true,
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
});

tasks.serve({
  as: 'serve',
  notify: false,
  open: true,
  server: './dist'
});

gulp.task('watch', function () {
  lygt.watch('scripts', ['browserify', 'serve-reload']);
  lygt.watch('index', ['html', 'serve-reload']);
  lygt.watch('scss', ['scss']);
});

gulp.task('build', function (next) {
  lygt.run('clear', ['browserify', 'html', 'scss', 'copy'], next);
});

gulp.task('default', function (next) {
  lygt.run(['build', 'watch'], 'serve', next);
});
