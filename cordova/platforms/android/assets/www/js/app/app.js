angular.module("holcomberacing", ['ngMaterial', 'chart.js', 'httpServices'])
  .controller("tracktimes", ["$scope", "$mdSidenav", "api", function($scope, $mdSidenav, api){

    $scope.trackName = "";
    $scope.navItems = [
      "Carlsbad",
      "Miramar",
      "Downtown",
      "East Lake (coming soon)"
    ]


    $scope.navToggle = function() {
      $scope.sidenavState = !$scope.sidenavState
    }

    $scope.navItemSelected = function(item){
      $mdSidenav('nav').close();

      api.kart(item)
        .then(function(response){
          response = response.data;
          var dates = [];
          var laps = [];
          var avgArr = [];

          delete $scope.labels;
          delete $scope.series;
          delete $scope.data;
          delete $scope.options;

        	for(var i = 0; i < response.heats.length; i++){
            var split = response.heats[i].date_time_local.split(" ");

        		dates.unshift(split[0]);
            laps.unshift(response.heats[i].best_time); // server response
        	}
        	var avg = laps.reduce(function(p,c,i){return p+(c-p)/(i+1)},0).toFixed(3);

        	for(var i = 0; i < response.heats.length; i++) {
        		avgArr.push(avg);
        	}

          $scope.labels = dates;
          $scope.series = ['Lap Time', 'Track Average'];
          $scope.data = [laps, avgArr];
          $scope.options = {
              maintainAspectRatio: false
          }

        },
        function(response){
          // handle err
        });
      $scope.trackName = item;
    }



  }]);
