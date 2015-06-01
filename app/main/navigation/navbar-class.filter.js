(function () {

  angular.module('at-filters').filter('navbarClass', function () {
    'use strict';

    return function(input, value){
      if(input === value){
        return  'dm-svg-active';
      }
      return 'dm-svg-inactive';
    }

  });

})();