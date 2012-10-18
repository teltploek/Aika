'use strict';

aikaApp.directive('ncTimeslot', function() {
  return {
    template: '<div class="timeslot" ng-bind="timeslot.isSelected" ng-class="{selected: timeslot.isSelected}">{{timeslot.isSelected}}</div>',
    restrict: 'E',
    scope: {
      timeslot : '='
    }
  };
});
