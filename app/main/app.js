(function () {
  'use strict';

  angular.module('at-controllers', []);
  angular.module('at-directives', []);
  angular.module('at-filters', []);
  angular.module('at-services', []);

  angular.module('at',
    [
      'ui.router',
      'ngMaterial',
      'at-controllers',
      'at-directives',
      'at-filters',
      'at-services'
    ]
  );

  angular.module('at').config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('blue-grey')
      .accentPalette('pink');
  });

})();