(function () {
  'use strict';

  angular.module('at').config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    'use strict';

    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/home');

    $stateProvider
      .state('home', {
        url: '/home',
        controller: 'HomeCtrl',
        templateUrl: 'navigation/home.html'

      })
      .state('talk', {
        url: '/talk/:id',
        controller: 'TalkDetailCtrl as talk',
        templateUrl: 'talks/talk-detail.html'

      })
      .state('talks', {
        url: '/talk',
        controller: 'TalkListCtrl as talks',
        templateUrl: 'talks/talk-list.html'

      });
  });

})();