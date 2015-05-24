(function () {
  'use strict';

  /**
   * This directive is used to define a nav bar in the pages
   */
  angular.module('at-directives').directive('talkImgFormat', function () {
    'use strict';

    return {
      templateUrl: 'talks/directives/talk-img-format.directive.html',
      restrict: 'E',
      scope: {
        format: '='
      },
      link: function (scope) {
        scope.$watch('format', function (newValue) {
          scope.imgsrc = 'img/icons/ic_talk.svg';
          if (newValue === 'Keynote') {
            scope.imgsrc = 'img/icons/ic_keynotes.svg';
          }
          else if (newValue === 'Workshop') {
            scope.imgsrc = 'img/icons/ic_workshop.svg';
          }
        });


      }
    };

  });

})();