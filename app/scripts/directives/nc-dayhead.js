'use strict';

aikaApp.directive('ncDayhead', function() {
  return {
    template: '<div>{{day | date:"d/MM" }}</div>',
    restrict: 'E',
    scope: {
      day : '='
    }
  };
});
