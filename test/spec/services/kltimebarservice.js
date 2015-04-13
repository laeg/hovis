'use strict';

describe('Service: klTimebarService', function () {

  // load the service's module
  beforeEach(module('graphAngularApp'));

  // instantiate service
  var klTimebarService;
  beforeEach(inject(function (_klTimebarService_) {
    klTimebarService = _klTimebarService_;
  }));

  it('should do something', function () {
    expect(!!klTimebarService).toBe(true);
  });

});
