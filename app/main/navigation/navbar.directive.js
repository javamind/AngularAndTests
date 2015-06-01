(function () {
  'use strict';

  /**
   * This directive is used to define a nav bar in the pages
   */
  angular.module('at-directives').directive('navbar', function () {
    'use strict';

    return {
      template: '<md-content>' +
        '<md-toolbar>' +
          '<div class="md-toolbar-tools">' +
            '<a href="http://dev-mind.fr"><img src="img/logo-devmind-long.png"></a>' +
              '<span flex></span>' +
              '<md-button class="md-icon-button" aria-label="Home" ui-sref="home">' +
                '<md-icon md-svg-icon="img/icons/ic_home.svg" class="dm-toolbar {{pageinfo.name | navbarClass:\'home\'}}"></md-icon>' +
              '</md-button>' +
              '<md-button class="md-icon-button" aria-label="Talks" ui-sref="talks">' +
                '<md-icon md-svg-icon="img/icons/ic_talks.svg" class="dm-toolbar {{pageinfo.name | navbarClass:\'talks\'}}"></md-icon>' +
              '</md-button>' +
            '</div>' +
          '</md-toolbar>' +
        '</md-content>',
      restrict: 'E',
      scope: {
        pageinfo : '='
      }
    };

  });

})();