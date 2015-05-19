(function () {
  'use strict';

  angular.module('at-controllers').controller('HomeCtrl', ['$scope', '$window', function ($scope, $window) {
    'use strict';

    $scope.pageinfo = { name: 'home'};

    $scope.goToLink = function (link) {
      $window.location.href = link;
    }

    $scope.changeName = function (name) {
      $scope.pageinfo = { name: name};
    }

    $scope.links = [
      {label : 'Dev-Mind', link : 'http://dev-mind.fr/', icon : 'ic_website.svg' },
      {label : 'Blog', link : 'http://javamind-fr.blogspot.fr/', icon : 'ic_blogger.svg' },
      {label : 'Twitter', link : 'https://twitter.com/guillaumeehret', icon : 'ic_twitter.svg' },
      {label : 'Google+', link : 'https://plus.google.com/u/0/+GuillaumeEhret', icon : 'ic_google.svg' },
      {label : 'Facebook', link : 'https://www.facebook.com/devmindfr', icon : 'ic_facebook.svg' }
    ];
  }]);

})();
