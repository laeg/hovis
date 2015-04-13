'use strict';

describe('Directive: klTimebar', function () {

  // load the directive's module
  beforeEach(module('graphAngularApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<kl-timebar></kl-timebar>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the klTimebar directive');
  }));
});
