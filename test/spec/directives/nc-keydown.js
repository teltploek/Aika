'use strict';

describe('Directive: ncKeydown', function() {
  beforeEach(module('aikaApp'));

  var element;

  it('should make hidden element visible', inject(function($rootScope, $compile) {
    element = angular.element('<nc-keydown></nc-keydown>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the ncKeydown directive');
  }));
});
