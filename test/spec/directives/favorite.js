'use strict';

describe('Directive: favorite', function() {
  beforeEach(module('aikaApp'));

  var element;

  it('should make hidden element visible', inject(function($rootScope, $compile) {
    element = angular.element('<favorite></favorite>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the favorite directive');
  }));
});
