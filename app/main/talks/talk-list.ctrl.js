(function () {
  'use strict';

  angular.module('at-controllers').controller('TalkListCtrl', function ($mdDialog, $location, talkService) {
    'use strict';

    var ctrl = this;

    //Load the talks
    ctrl.refresh = function () {
      talkService.getAll(ctrl.filter).then(function(data){
        ctrl.list = data;
      });
    }

    //Zoom on a talk
    ctrl.goToTalk = function (talk) {
      $location.path('/talk/' + talk.id);
    };

    ctrl.pageinfo = { name: 'talks'};

    ctrl.filter = {
      keynote: true,
      talk: true,
      workshop: true
    };

    ctrl.refresh();

    //Display a talk in a modal
    ctrl.previewTalk = function (talk, event) {
      ctrl.selectedTalk = talk;
      $mdDialog.show({
        controller: 'TalkDetailDialogCtrl',
        templateUrl: 'talks/dialog/talk-detail--dialog.html',
        targetEvent: event,
        locals: {
          talk: ctrl.selectedTalk
        }
      });
    };
  });

})();