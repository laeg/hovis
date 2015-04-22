'use strict';

describe('Service: accordion', function () {

  // load the service's module
  beforeEach(module('graphAngularApp'));

  // instantiate service
  var accordion;
  beforeEach(inject(function (_accordion_) {
    accordion = _accordion_;
  }));

  it('should do something', function () {
    expect(!!accordion).toBe(true);
  });

});
