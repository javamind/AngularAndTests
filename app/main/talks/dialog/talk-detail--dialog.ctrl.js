(function () {
  'use strict';

  angular.module('at-controllers').controller('TalkDetailDialogCtrl', function ($mdDialog, $scope, talk, talkService) {
    'use strict';

    $scope.cancel = function () {
      $mdDialog.cancel();
    };

    $scope.talk = talk;

    talkService.getTalkSpeakers(talk.id).then(function (data) {
      $scope.talk.speakers = data;
    });

  });

})();