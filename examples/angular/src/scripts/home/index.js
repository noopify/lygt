module.exports = angular
  .module('demo.home', [])
  .constant('$config', process.env.config)
  .config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider.state('home', {
      url: '/',
      controller: require('./home.controller'),
      template: require('./home.html')
    });

    $urlRouterProvider.otherwise('/');

  })
  .name;
