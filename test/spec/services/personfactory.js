'use strict';

describe('Service: personFactory', function () {

  // load the service's module
  beforeEach(module('graphAngularApp'));

  // instantiate service
  var personFactory;
  beforeEach(inject(function (_personFactory_) {
    personFactory = _personFactory_;
  }));

  it('should do something', function () {
    expect(!!personFactory).toBe(true);
  });

});
