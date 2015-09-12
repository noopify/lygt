module.exports = // @ngInject
  function($stateProvider) {

    $stateProvider.state('main', {
      url: '/',
      views: {
        main: {
          template: require('./main.html'),
          controller: require('./main.controller'),
          controllerAs: 'vm'
        }
      }
    });

  };
