(function () {
  'use strict';

  /**
   * This directive is used to define a nav bar in the pages
   */
  angular.module('at-directives').directive('navbar', function () {
    'use strict';

    return {
      templateUrl: 'navigation/navbar.directive.html',
      restrict: 'E',
      scope: {
        pageinfo : '='
      }
    };

  });

})();