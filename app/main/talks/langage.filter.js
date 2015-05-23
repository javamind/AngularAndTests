(function () {

  angular.module('at-filters').filter('language', function () {
    'use strict';

    return function(input){
      if(input === 'en'){
        return 'EN';
      }
      //fr is the default language
      return 'FR';
    }

  });

})();