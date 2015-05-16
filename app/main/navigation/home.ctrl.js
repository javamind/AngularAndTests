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
  }]);

})();