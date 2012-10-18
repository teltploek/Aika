'use strict';

describe('Service: period', function () {

  // load the service's module
  beforeEach(module('aikaApp'));

  // instantiate service
  var period;
  beforeEach(inject(function(_period_) {
    period = _period_;
  }));

  it('should do something', function () {
    expect(!!period).toBe(true);
  });

});
