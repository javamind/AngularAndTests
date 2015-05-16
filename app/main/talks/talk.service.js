(function () {
  'use strict';

  angular.module('at-services').factory('TalkService', ['$http', function ($http) {
    'use strict';


    /**
     * Get one talk by id
     */
    function get(id) {
      return $http.get('/api/talks/' + id).then(function(response){
        return response.data;
      });
    }

    /**
     * Get all the talks with eventually a filter on talk format
     */
    function getAll(talkFilters) {
      return $http.get('/api/talks').then(function(response){
        return response.data._embedded.talks.filter(function (elt) {
          return (talkFilters.keynote && 'Keynote' === elt.format) ||
            (talkFilters.workshop && 'Workshop' === elt.format) ||
            (talkFilters.talk && 'Talk' === elt.format)
        })
      });
    }

    /**
     * Get one talk by id
     */
    function getTalkSpeakers(idTalk) {
      return $http.get('/api/talks/' + idTalk + '/speakers').then(function (response){
        if(response.data._embedded){
          return response.data._embedded.speakers;
        }
        else{
          return [];
        }
      });
    }

    /**
     * Save a talk
     */
    function save(talk) {
      if(talk.id){
        return $http.put('/api/talks/' + talk.id, talk);
      }
      else{
        return $http.post('/api/talks', talk);
      }

    }

    return {
      get: get,
      getAll: getAll,
      getTalkSpeakers :getTalkSpeakers,
      save : save
    }
  }]);

})();