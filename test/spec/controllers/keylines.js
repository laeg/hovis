'use strict';

describe('Controller: KeylinesCtrl', function () {

  // load the controller's module
  beforeEach(module('graphAngularApp'));

  var KeylinesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    KeylinesCtrl = $controller('KeylinesCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
