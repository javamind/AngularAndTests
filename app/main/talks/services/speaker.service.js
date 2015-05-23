(function () {
  'use strict';

  angular.module('at-services').factory('speakerService', ['$http', function ($http) {
    'use strict';


    /**
     * Save a talk speaker
     */
    function save(speaker, talk) {

      speaker.talk = talk._links ? talk._links.self.href : undefined;

      if (!speaker.urlimage) {
        speaker.urlimage = 'https://sigil.cupcake.io/' + speaker.firstname + speaker.lastname;
      }

      if(speaker.id){
        return $http.put('/api/speakers/' + speaker.id, speaker);
      }
      else{
        return $http.post('/api/speakers', speaker);
      }
    }

    /**
     * Delete a talk speaker
     */
    function remove(speaker) {
      return $http.delete('/api/speakers/' + speaker.id);
    }

    return {
      save: save,
      remove: remove
    }

  }]);

})();