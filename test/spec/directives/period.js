'use strict';

describe('Directive: period', function() {
  beforeEach(module('aikaApp'));

  var element;

  it('should make hidden element visible', inject(function($rootScope, $compile) {
    element = angular.element('<period></period>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the period directive');
  }));
});
