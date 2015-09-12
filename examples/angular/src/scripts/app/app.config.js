module.exports = // @ngInject
  function($logProvider, $urlRouterProvider, $config) {

    if (!$config.DEBUG) {
      $logProvider.debugEnabled(false);
    }

    $urlRouterProvider.otherwise('/');

  };
