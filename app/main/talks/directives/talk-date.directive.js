(function () {
  'use strict';

  /**
   * This directive is used to define a nav bar in the pages
   */
  angular.module('at-directives').directive('talkDate', ['$filter', function ($filter) {
    'use strict';

    return {
      template: '{{date}} from {{startTime}} to {{endTime}}',
      restrict: 'E',
      scope: {
        start: '=',
        end: '='
      },
      link: function (scope) {
        scope.date = $filter('date')(scope.start);
        scope.startTime = $filter('date')(scope.start, 'shortTime');
        scope.endTime = $filter('date')(scope.end, 'shortTime');
      }
    };

  }]);

})();