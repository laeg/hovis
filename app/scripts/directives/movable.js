'use strict';

angular.module('graphAngularApp')
	.directive('movable', function () {
		return {
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				var startX = 0,
					startY = 0,
					x = 0,
					y = 0;

				/**element.css({
					position: 'abolute',
				});*/

				function bindElemtMove() {
					element.bind('mousedown', function (event) {
						console.log("binding element to move")
						startX = event.screenX - x;
						startY = event.screenY - y;
						$document.bind('movemove', moveDiv);
						$document.bind('mouseup', mouseUp);
					});
				}

				bindElemtMove();

				function moveDiv(event) {
					console.log("I'm moving");
					y = event.screenY - startY;
					x = event.screenX - startX;
					/**element.css({
						top: y + 'px',
						left: x + 'px'
					});*/
				}
				
				function mouseUp(){
					console.log("mouse up fired - unbind moveDiv and mouseUp");
					$document.unbind('movemove', moveDiv);
					$document.unbind('mouseup', mouseUp);
				}
			}
		};
	});