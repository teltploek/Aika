'use strict';

aikaApp.directive('ncTimeslot', function() {
  return {
    template: '<div class="timeslot" ng-class="{selected:timeslot.isSelected,edit:timeslot.isEditMode}" ng-click="timeslot.toggleSelection(true)" ng-bind="timeslot.isSelected"></div>',
    restrict: 'E',
    scope: {
      timeslot : '='
    },
    link: function (scope, element, attrs) {
    }
  };
});
