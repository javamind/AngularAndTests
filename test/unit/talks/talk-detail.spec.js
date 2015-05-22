/**
 * Created by ehret_g on 14/05/15.
 */
(function () {
  'use strict'

  describe('TalkDetailCtrl : ', function () {
    var $scope, $controller, talkService, speakerService;

    beforeEach(module('at-controllers'));

    /**
     * to prevent to use an external lib I use my own promise mock
     */
    function Mock(response) {
      var mock = this;
      mock.response = response;
      mock.$promise = function () {
        return {
          then: function (callback) {
            callback(mock.response);
          }
        }
      }
    }

    beforeEach(inject(function ($injector) {
      $scope = $injector.get('$rootScope').$new();

      //We could load module at-services but I prefer remain isolated. But I have to stub object talkService. We can create simple mock objects
      speakerService = {
        save: function(){},
        remove: function(){}
      }
      spyOn(speakerService, 'save').and.callFake(new Mock().$promise);
      spyOn(speakerService, 'remove').and.callFake(new Mock().$promise);

      talkService = {
        get: function(){},
        getTalkSpeakers: function(){},
        save: function(){}
      };
      spyOn(talkService, 'get').and.callFake(new Mock({id: 1, title: 'my talk'}).$promise);
      spyOn(talkService, 'getTalkSpeakers').and.callFake(new Mock([
        {id: 1, firstname: 'Guillaume' }
      ]).$promise);
      spyOn(talkService, 'save').and.callFake(new Mock().$promise);

      //When the data is refreshed we reset the talkForm. We use a mock
      $scope.talkForm = { $setPristine: jasmine.createSpy('$setPristine')};

      $controller = $injector.get('$controller')('TalkDetailCtrl', {
        $stateParams: { id: 1 },
        $scope: $scope,
        talkService: talkService,
        speakerService: speakerService
      });

    }));

    it('should have its name in pageinfo', function () {
      expect($controller.pageinfo).toEqual({name: 'talks'});
    });

    it('should load the talk in the controller scope', function () {
      expect($controller.selectedTalk.title).toBe('my talk');
    });


    it('should load the talk speakers in the controller scope', function () {
      expect($controller.speakers[0].firstname).toBe('Guillaume');
    });

    describe('refreshTalk', function () {

      it('should refresh the talkform', function () {
        //we reset the mock because reset on talkForm is called on init
        $scope.talkForm.$setPristine.calls.reset();

        $controller.refreshTalk();

        expect($scope.talkForm.$setPristine).toHaveBeenCalled();
      });

      it('should reload the talk', function () {
        $controller.refreshTalk();
        expect($controller.selectedTalk.title).toBe('my talk');
      });

    });

    describe('with panel talk', function () {

      it('should save talk and refresh form', function () {
        spyOn($controller, 'refreshTalk')
        $controller.saveTalk();
        expect($controller.refreshTalk).toHaveBeenCalled();
      });

    });


    describe('with panel speakers', function () {

      it('should save a speaker', function () {
        spyOn($controller, 'refreshSpeaker')
        $controller.selectedSpeaker = {
          id: 1,
          firstname: 'Guillaume'
        };

        $controller.saveSpeaker($controller.selectedSpeaker);

        expect(speakerService.save).toHaveBeenCalled();
        expect($controller.refreshSpeaker).toHaveBeenCalled();
        //After saving the scope is cleaned
        expect($controller.selectedSpeaker).toBeUndefined();
      });

      it('should remove a speaker', function () {
        spyOn($controller, 'refreshSpeaker')
        $controller.selectedSpeaker = {
          id: 1,
          firstname: 'Guillaume'
        };

        $controller.removeSpeaker($controller.selectedSpeaker);

        expect(speakerService.remove).toHaveBeenCalled();
        expect($controller.refreshSpeaker).toHaveBeenCalled();
        //After saving the scope is cleaned
        expect($controller.selectedSpeaker).toBeUndefined();
      });

      it('should clean speaker in scope ', function () {
        $controller.selectedSpeaker = {
          id: 1,
          firstname: 'Guillaume'
        };

        $controller.cancelSpeakerEdition();

        expect($controller.selectedSpeaker).toBeUndefined();
      });

    });
  });

})();
