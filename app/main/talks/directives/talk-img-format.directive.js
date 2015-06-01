(function () {
  'use strict';

  /**
   * This directive is used to define a nav bar in the pages
   */
  angular.module('at-directives').directive('talkImgFormat', function () {
    'use strict';

    return {
      template:
        '<md-button class="md-icon-button" aria-label="{{format}}">' +
          '<md-tooltip>{{format}}</md-tooltip>' +
          '<md-icon md-svg-src="{{imgsrc}}" class="md-avatar dm-talk-img" alt="{{format}}"></md-icon>'+
        '</md-button>',
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