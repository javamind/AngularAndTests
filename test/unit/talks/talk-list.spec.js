/**
 * Created by ehret_g on 14/05/15.
 */
(function () {
  'use strict'

  describe('TalkListCtrl', function () {
    var $controller, $location, $mdDialog, TalkService;

    beforeEach(module('at-controllers', 'ngMaterial'));

    beforeEach(inject(function ($injector) {
      $location = $injector.get('$location');
      $mdDialog = $injector.get('$mdDialog');

      //We could load module at-services but I prefer remain isolated. But I have to stub object TalkService. We can create a mock object
      //If we have a lot of promise like in the file talk-detail.spec.js we can use our own class
      TalkService = {
        getAll: function () {
          return {
            then: function (callback) {
              callback([
                {
                  id: 1,
                  title: 'my talk'
                }
              ]);
            }
          }
        }
      };

      $controller = $injector.get('$controller')('TalkListCtrl', {
        $mdDialog: $mdDialog,
        $location: $location,
        TalkService: TalkService
      });

    }));

    it('should have its name in pageinfo', function () {
      expect($controller.pageinfo).toEqual({name: 'talks'});
    });

    it('should initialize filter with true', function () {
      expect($controller.filter).toEqual({
          keynote: true,
          talk: true,
          workshop: true
        }
      );
    });

    it('should put a list of talks in scope', function () {
      expect($controller.list.length).toBe(1);
    });

    it('should put selectedTalk in scope if user click on a talk', function () {
      spyOn($mdDialog, 'show');

      $controller.previewTalk({
        id: 1,
        title: 'my talk'
      });

      expect($controller.selectedTalk.title).toBe('my talk');
      expect($mdDialog.show).toHaveBeenCalled();
    });

    it('should zoom on talk', function () {
      $controller.goToTalk({
        id: 1,
        title: 'my talk'
      });

      expect($location.path()).toBe('/talk/1')
    });
  });

})();
