'use strict';

describe('Directive: project', function() {
  beforeEach(module('aikaApp'));

  var element;

  it('should make hidden element visible', inject(function($rootScope, $compile) {
    element = angular.element('<project></project>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the project directive');
  }));
});
