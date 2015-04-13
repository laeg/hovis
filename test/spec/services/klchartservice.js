'use strict';

describe('Service: klChartService', function () {

  // load the service's module
  beforeEach(module('graphAngularApp'));

  // instantiate service
  var klChartService;
  beforeEach(inject(function (_klChartService_) {
    klChartService = _klChartService_;
  }));

  it('should do something', function () {
    expect(!!klChartService).toBe(true);
  });

});
