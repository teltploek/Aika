'use strict';

describe('Directive: ncGridfocus', function() {
  beforeEach(module('aikaApp'));

  var element;

  it('should make hidden element visible', inject(function($rootScope, $compile) {
    element = angular.element('<nc-gridfocus></nc-gridfocus>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the ncGridfocus directive');
  }));
});
