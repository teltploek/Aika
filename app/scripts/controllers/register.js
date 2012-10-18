'use strict';

aikaApp.controller('RegisterCtrl',
  ['$scope', 'Period', function($scope, Period) {
  var periodInstance = new PeriodController();

    Period.get({}, function(response){
      var data = {},
          initValues;

      angular.forEach(response, function(item, key){
        data[key] = item;
      });

      $scope.periodData = data;

      initValues = periodInstance.init(
        $scope.periodData
      );

      angular.forEach(initValues, function(item, key){
        $scope[key] = item;
      });
    });
}]);