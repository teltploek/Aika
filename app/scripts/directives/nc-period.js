'use strict';

aikaApp.directive('ncPeriod', function() {
  return {
    template: '<div>{{caption}}</div>',
    restrict: 'E',
    scope: {
      caption : '='
    }
  };
});
