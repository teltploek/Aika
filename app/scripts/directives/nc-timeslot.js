'use strict';

aikaApp.directive('ncTimeslot', function() {
  return {
    template: '<div class="timeslot" ng-click="timeslot.toggleMode()" ng-class="{edit: timeslot.isEditMode}">{{timeslot.hours}}</div>',
    restrict: 'E',
    scope: {
      timeslot : '='
    }
  };
});
