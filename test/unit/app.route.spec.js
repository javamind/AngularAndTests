/**
 * Created by ehret_g on 07/05/15.
 */
(function () {
  'use strict'

  var $rootScope, $location, $state;

  describe('Application at', function () {
    beforeEach(module('at', 'ui.router', 'at-templates'));

    beforeEach(inject(function ($injector) {
      $rootScope = $injector.get('$rootScope');
      $location = $injector.get('$location');
      $state = $injector.get('$state');
    }));

    it('should load home by default', function () {
      // when we go to the editor
      $location.path('/');
      $rootScope.$apply();

      expect($state.current.name).toBe('home');
      expect($state.current.controller).toBe('HomeCtrl');
    });

    it('should navigate to talk list page when url=[/talk]', function () {
      // when we go to the editor
      $location.path('/talk');
      $rootScope.$apply();

      expect($state.current.name).toBe('talks');
      expect($state.current.controller).toBe('TalkListCtrl as talks');
    });

    it('should navigate to talk detail page when url=[/talk/id]', function () {
      // when we go to the editor
      $location.path('/talk/id');
      $rootScope.$apply();

      expect($state.current.name).toBe('talk');
      expect($state.current.controller).toBe('TalkDetailCtrl as talk');
    });
  });

})();