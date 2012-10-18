'use strict';

describe('Directive: dayhead', function() {
  beforeEach(module('aikaApp'));

  var element;

  it('should make hidden element visible', inject(function($rootScope, $compile) {
    element = angular.element('<dayhead></dayhead>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the dayhead directive');
  }));
});
