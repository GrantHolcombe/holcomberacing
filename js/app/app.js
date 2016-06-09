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
          var response = response.data;
          // set times and dates from response
          var dates = response.dates.reverse();
          var laps = response.times.reverse();
          // get lap avg from laps arr
        	var avg = laps.reduce(function(p,c,i){return p+(c-p)/(i+1)},0).toFixed(3);
          // setup an arr to make an Average line on graphs
          var avgArr = [];

          // clear chart items fro redraw
          delete $scope.labels;
          delete $scope.series;
          delete $scope.data;
          delete $scope.options;

          // push avg into avgArr
        	for(var i = 0; i < laps.length; i++){
            avgArr.push(avg);
          }

          $scope.pr = Math.min.apply(null, laps).toFixed(3);
          $scope.labels = dates;
          $scope.series = ['Lap Time', 'Track Average'];
          $scope.data = [laps, avgArr];
          $scope.options = {
              maintainAspectRatio: false,
              scaleFontColor: "#ffffff"
          }

          $scope.newPr = (parseFloat(laps[laps.length - 1]) === $scope.pr);


        },
        function(response){
          // handle err
        });
      $scope.trackName = item;
    }



  }]);
