angular.module('httpServices', [])
  .service('api', function($http) {
  return {
    kart: function(trackName) {

      if(trackName == "Carlsbad"){
        trackendpoint = "http://54.183.9.219/api/fetch-times/k1carlsbad/17108762"
      }
      if(trackName == "Miramar"){
        trackendpoint = "http://54.183.9.219/api/fetch-times/mscmiramar/1170635"
      }
      if(trackName == "Downtown"){
        trackendpoint = "http://54.183.9.219/api/fetch-times/k1sandiego/17108762"
      }

      return $http({
        url: trackendpoint,
        method: 'GET'
      });
    }
  }
});
