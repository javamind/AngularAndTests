(function () {
  'use strict';

  angular.module('at-controllers').controller('TalkDetailCtrl', ['$stateParams', '$scope', 'TalkService','SpeakerService', function ($stateParams, $scope, TalkService, SpeakerService) {
    'use strict';

    var ctrl = this;

    //Panel for talk
    ctrl.refreshTalk = function () {
      TalkService.get($stateParams.id).then(function (talk){
        ctrl.selectedTalk = talk;
        $scope.talkForm.$setPristine();
        ctrl.refreshSpeaker();
      });
    };

    ctrl.saveTalk = function () {
      TalkService.save(ctrl.selectedTalk).then(ctrl.refreshTalk);
    };


    //Panel for speaker
    ctrl.refreshSpeaker = function () {
      TalkService.getTalkSpeakers($stateParams.id).then(function (speakers){
        ctrl.speakers = speakers;
      });
    };
    ctrl.saveSpeaker = function (speaker) {
      SpeakerService.save(speaker, ctrl.selectedTalk).then(ctrl.refreshSpeaker);
      delete ctrl.selectedSpeaker;
    }
    ctrl.removeSpeaker = function (speaker) {
      SpeakerService.remove(speaker).then(ctrl.refreshSpeaker);
      delete ctrl.selectedSpeaker;
    }
    ctrl.cancelSpeakerEdition = function () {
      delete ctrl.selectedSpeaker;
    };

    //Page initialization
    ctrl.pageinfo = { name: 'talks'};
    ctrl.refreshTalk();


  }]);

})();