'use strict';

describe('Directive: dropDownBtn', function () {

  // load the directive's module
  beforeEach(module('graphAngularApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<drop-down-btn></drop-down-btn>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the dropDownBtn directive');
  }));
});
