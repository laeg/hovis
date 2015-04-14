'use strict';

describe('Service: neoFactory', function () {

  // load the service's module
  beforeEach(module('graphAngularApp'));

  // instantiate service
  var neoFactory;
  beforeEach(inject(function (_neoFactory_) {
    neoFactory = _neoFactory_;
  }));

  it('should do something', function () {
    expect(!!neoFactory).toBe(true);
  });

});
