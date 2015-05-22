/**
 * Created by ehret_g on 14/05/15.
 * Quand votre service fait appel à une requête http c'est comme ça que l'on nous recommande de tester
 * mais perso je ne suis pas fan de charger le module de service dans les tests et de gérer un $httpBackend
 * Je préfère la solution talk-detail.spec.js
 */
(function () {
  'use strict'

  describe('TalkDetailCtrl (common way) : ', function () {
    var $scope, $controller, $httpBackend, talkService, speakerService;

    beforeEach(module('at-controllers', 'at-services'));

    beforeEach(inject(function ($injector) {
      $scope = $injector.get('$rootScope').$new();
      $httpBackend = $injector.get('$httpBackend');
      talkService = $injector.get('talkService');
      speakerService = $injector.get('speakerService');

      //When the data is refreshed we reset the talkForm. We use a mock
      $scope.talkForm = { $setPristine: jasmine.createSpy('$setPristine')};

      $controller = $injector.get('$controller')('TalkDetailCtrl', {
        $stateParams: { id: 1 },
        $scope: $scope,
        talkService: talkService,
        speakerService: speakerService
      });
    }));


    var mockRefreshTalkRequest = function () {
      $httpBackend.expectGET('/api/talks/1').respond(200, {id: 1, title: 'my talk'});
    }

    var mockRefreshTalkSpeakersRequest =  function () {
      $httpBackend.expectGET('/api/talks/1/speakers').respond(200, {
        _embedded: {
          speakers: [
            {id: 1, firstname: 'Guillaume' }
          ]
        }
      });
    }

    beforeEach(function () {
      //On load talk and speakers are called
      mockRefreshTalkRequest();
      mockRefreshTalkSpeakersRequest();
      $httpBackend.flush();
    });

    afterEach(function () {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    describe('init', function () {

      it('should have its name in pageinfo', function () {
        expect($controller.pageinfo).toEqual({name: 'talks'});
      });

      it('should load the talk in the controller scope', function () {
        expect($controller.selectedTalk.title).toBe('my talk');
      });


      it('should load the talk speakers in the controller scope', function () {
        expect($controller.speakers[0].firstname).toBe('Guillaume');
      });
    });

    describe('refreshTalk', function () {

      beforeEach(function () {
        //When the talks is refreshed : talk and speakers are called
        mockRefreshTalkRequest();
        mockRefreshTalkSpeakersRequest();
      });


      it('should refresh the talkform', function () {
        //we reset the mock because reset on talkForm is called on init
        $scope.talkForm.$setPristine.calls.reset();

        $controller.refreshTalk();
        $httpBackend.flush();

        expect($scope.talkForm.$setPristine).toHaveBeenCalled();
      });

      it('should reload the talk', function () {
        $controller.refreshTalk();
        $httpBackend.flush();

        expect($controller.selectedTalk.title).toBe('my talk');
      });

    });

    describe('with panel talk', function () {

      it('should save talk and refresh form', function () {
        $httpBackend.expectPUT('/api/talks/1').respond(200);
        spyOn($controller, 'refreshTalk')

        $controller.saveTalk();
        $httpBackend.flush();

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
        $httpBackend.expectPUT('/api/speakers/1').respond(200);

        $controller.saveSpeaker($controller.selectedSpeaker);
        $httpBackend.flush();

        expect($controller.refreshSpeaker).toHaveBeenCalled();
        //After saving the scope is cleaned
        expect($controller.selectedSpeaker).toBeUndefined();
      });

      it('should remove a speaker', function () {
        $httpBackend.expectDELETE('/api/speakers/1').respond(200);
        spyOn($controller, 'refreshSpeaker')
        $controller.selectedSpeaker = {
          id: 1,
          firstname: 'Guillaume'
        };

        $controller.removeSpeaker($controller.selectedSpeaker);
        $httpBackend.flush();

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
