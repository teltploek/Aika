'use strict';

aikaApp.directive('ncProject', function() {
  return {
    template: '<div>{{account}} {{project}}</div>',
    restrict: 'E',
    scope: {
      project : '=',
      account : '='
    }
  };
});