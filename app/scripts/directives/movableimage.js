'use strict';

angular.module('graphAngularApp')
	.directive('movableImage', function () {
		return {
			restrict: 'E',
			template: '<div movable ng-style="{top:tb.x, left:tb.y, height:tb.height, width:tb.width}"><img ng-src="/images/{{menuItems.imgName}}.png"  ng-style="{height:tb.height, width:tb.width}"/></div>',
			require: 'ngModel',
			replace: true,
		};
	});