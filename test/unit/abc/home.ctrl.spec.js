/**
 * Created by ehret_g on 16/05/15.
 */
(function () {
  'use strict'

  describe('HomeCtrl', function () {

    var $scope, $window;

    beforeEach(module('at-controllers'));

    beforeEach(inject(function($injector){
      $scope = $injector.get('$rootScope').$new();
      $window = {
        location : {
          href : ''}
      };

      var $controller = $injector.get('$controller')('HomeCtrl', {
        $scope: $scope,
        $window : $window
      });

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


    describe('Pour aller plus loin', function () {

      var $compile;

      beforeEach(inject(function ($injector) {
        $compile = $injector.get('$compile');
      }));

      it('should interpolate angular expression', function () {
        var expression = '<p>{{pageinfo.name}} {{1+1}}</p>';

        var element = $compile(expression)($scope);
        expect(element.html()).not.toBe('home 2');

        $scope.$digest();

        expect(element.html()).toBe('home 2');
      });
    });
  });

})();