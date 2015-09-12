/**
 * Entry.
 */
module.exports = require('angular')
  .module('root', [
    // Dependencies
    require('angular-ui-router'),
    // Application
    require('./app'),
    require('./components')
  ]);
