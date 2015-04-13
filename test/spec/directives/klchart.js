'use strict';

describe('Directive: klChart', function () {

  // load the directive's module
  beforeEach(module('graphAngularApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<kl-chart></kl-chart>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the klChart directive');
  }));
});
