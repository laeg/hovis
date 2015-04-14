'use strict';

angular.module('graphAngularApp')
	.factory('klTimebarService', ['klComponent', function (klComponent) {
		var klTimebarService = Object.create(klComponent);

		klTimebarService.create = function (elemId, callback) {
			klComponent.create(elemId, 'timebar', callback);
		};

		return klTimebarService;

  }]);