'use strict';

aikaApp.directive('ncGridfocus', function() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      jQuery(element).on('focus', function(e) {
        scope.$apply(function(){
          scope.timeslotGrid[0][0].toggleSelection(true);
        })
      });
    }
  };
});