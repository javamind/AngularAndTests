(function () {
  'use strict';

  angular.module('at-controllers').controller('TalkDetailCtrl', function ($stateParams, $scope, talkService, speakerService) {
    'use strict';

    var ctrl = this;

    //Panel for talk
    ctrl.refreshTalk = function () {
      talkService.get($stateParams.id).then(function (talk){
        ctrl.selectedTalk = talk;
        $scope.talkForm.$setPristine();
        ctrl.refreshSpeaker();
      });
    };

    ctrl.saveTalk = function () {
      talkService.save(ctrl.selectedTalk).then(ctrl.refreshTalk);
    };

    //Panel for speaker
    ctrl.refreshSpeaker = function () {
      talkService.getTalkSpeakers($stateParams.id).then(function (speakers){
        ctrl.speakers = speakers;
      });
    };
    ctrl.saveSpeaker = function (speaker) {
      speakerService.save(speaker, ctrl.selectedTalk).then(ctrl.refreshSpeaker);
      delete ctrl.selectedSpeaker;
    }
    ctrl.removeSpeaker = function (speaker) {
      speakerService.remove(speaker).then(ctrl.refreshSpeaker);
      delete ctrl.selectedSpeaker;
    }
    ctrl.cancelSpeakerEdition = function () {
      delete ctrl.selectedSpeaker;
    };

    //Page initialization
    ctrl.pageinfo = { name: 'talks'};
    ctrl.refreshTalk();


  });

})();