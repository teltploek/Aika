'use strict';

aikaApp.directive('ncGridfocus', function() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      jQuery(element).on('focus', function(e) {
        scope.activities[0].timeslots[0].toggleSelection();
      });
    }
  };
});
