(function () {
  'use strict';

  /**
   * Simple directive for test
   */
  angular.module('at-directives').directive('hello', function () {
    'use strict';

    return {
      template: '<div>Hello <b>{{name}}</b></div>',
      restrict: 'E',
      scope: {
        name : '='
      }
    };

  });

})();