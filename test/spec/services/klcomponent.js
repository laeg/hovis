'use strict';

describe('Service: klComponent', function () {

  // load the service's module
  beforeEach(module('graphAngularApp'));

  // instantiate service
  var klComponent;
  beforeEach(inject(function (_klComponent_) {
    klComponent = _klComponent_;
  }));

  it('should do something', function () {
    expect(!!klComponent).toBe(true);
  });

});
