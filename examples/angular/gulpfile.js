/**
 * ===============
 * G U L P F I L E
 * ===============
 * ```
 * gulp <task> --<key>=<value>
 * ```
 */

/**
 * Dependencies.
 */

var gulp = require('gulp');
var lygt = require('lygt').use(gulp);
var tasks = lygt.tasks;

/**
 * Build configurations.
 */

var data = {
  BUILD: Date.now(),
  // Merge env variables with config variables.
  CONFIG: lygt.merge(require('./config/env.js'), lygt.env)
};

/**
 * Tasks.
 */

tasks.clear({
  as: 'clean',
  from: './dist'
});

tasks.copy({
  as: 'assets',
  from: './assets/**/*',
  to: './dist'
});

tasks.html({
  as: 'index',
  from: './src/index.html',
  to: './dist',
  preprocess: data
});

tasks.scss({
  as: 'styles',
  from: './src/styles/index.scss',
  to: './dist/build',
  minify: data.CONFIG.RELEASE,
  output: data.BUILD + '.css',
  sourcemaps: !data.CONFIG.RELEASE
});

tasks.browserify({
  as: 'scripts',
  from: './src/scripts/index.js',
  to: './dist/build',
  minify: data.CONFIG.RELEASE,
  output: data.BUILD + '.js',
  sourcemaps: !data.CONFIG.RELEASE,
  transforms: [
    [require('stringify')],
    [require('preprocessify')(data.CONFIG, {includeExtensions: '.js', type: 'js'})],
    [require('preprocessify')(data.CONFIG, {includeExtensions: '.html', type: 'html'})],
    [require('browserify-ngannotate')]
  ],
  before: function(b) {
    b.require(lygt.write('./config/local.json', data.CONFIG), {expose: 'config'});
  }
});

tasks.serve({
  as: 'serve',
  from: './dist'
});

gulp.task('watch', function() {
  lygt.watch('scripts');
  lygt.watch('assets');
  lygt.watch('index');
  lygt.watch('styles');
});

gulp.task('build', function(next) {
  lygt.run('clean', ['scripts', 'index', 'styles', 'assets'], next);
});

gulp.task('default', function(next) {
  lygt.run(['build', 'watch'], 'serve', next);
});
