angular.module('httpServices', [])
  .service('api', function($http) {
  return {
    kart: function(trackName) {
      
      if(trackName == "Carlsbad"){
        trackendpoint = "http://kartlaps.info/k1carlsbad/racer/17108762"
      }
      if(trackName == "Miramar"){
        trackendpoint = "http://kartlaps.info/mscmiramar/racer/1170635"
      }
      if(trackName == "Downtown"){
        trackendpoint = "http://kartlaps.info/k1sandiego/racer/17108762"
      }

      return $http({
        url: trackendpoint,
        method: 'GET'
      });
    }
  }
});
