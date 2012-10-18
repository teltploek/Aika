'use strict';

aikaApp.directive('ncGridkey', function() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      jQuery(element).on('keydown', function(e) {
        console.log(e);
      });
    }
  };
});
