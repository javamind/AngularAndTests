/**
 * Created by Dev-Mind
 * *******************************
 * Le but de ce test est de montrer un test simple d'un controller utilisant $scope
 */
(function () {
  'use strict'

  describe('HomeCtrl', function () {
    var $scope, $location, $window, HomeCtrl;

    beforeEach(module('at-controllers'));

    beforeEach(inject(function (_$controller_, _$location_) {
      $scope = {};
      $location = _$location_;
      $window = {
        location : {
          href : ''}
      };
      HomeCtrl = _$controller_('HomeCtrl', {$scope: $scope, $window: $window});
    }));

    it('should have its name in pageinfo', function () {
      expect($scope.pageinfo.name).toBe('home');
      expect($scope.pageinfo).toEqual({name: 'home'});
    });

    it('should change name in pageinfo', function () {
      $scope.changeName('test');
      expect($scope.pageinfo).toEqual({name: 'test'});
    });

    it('should navigate to external url', function () {
      $scope.goToLink('http://dev-mind.fr');
      expect($window.location.href).toBe('http://dev-mind.fr');
    });
  });

})();