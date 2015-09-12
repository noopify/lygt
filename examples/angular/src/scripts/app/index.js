/**
 * Application.
 */
module.exports = angular
  .module('app', [
    require('./constants'),
    require('./filters'),
    require('./services')
  ])
  .config(require('./app.config'))
  .run(require('./app.run'))
  .name;
