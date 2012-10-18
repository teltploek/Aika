'use strict';

aikaApp.directive('ncKeydown', function() {
  return {
    restrict: 'A',
    link: function postLink(scope, element, attrs) {
      element.text('this is the ncKeydown directive');
    }
  };
});
