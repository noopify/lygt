module.exports = // @ngInject
  function($config) {
    var vm = this;

    vm.BUILD = 'DEBUG';
    vm.$config = $config;

    // @if RELEASE == true
    vm.BUILD = 'RELEASE';
    // @endif
  };
