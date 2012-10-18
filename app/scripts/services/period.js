'use strict';

aikaApp.factory('Period', ['$resource', function($resource){
  var randomPeriod = (function() {
    var nums = [1,2,3,4];
    var current = [];
    function rand(n) {
      return (Math.random() * n)|0;
    }
    return function() {
      if (!current.length) current = nums.slice();
      return current.splice(rand(current.length), 1);
    }
  }()),
  currentRandomPeriod = randomPeriod()[0];

  return $resource('scripts/mocks/period1.json', {}, {
    get: {
      method:'GET',
      params: { currentRandomPeriod : currentRandomPeriod },
      isArray: false
    }
  });
}]);