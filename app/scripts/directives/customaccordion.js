'use strict';

angular.module('graphAngularApp')
	.directive('customAccordion', function () {
		return {
			restrict: 'A',
			template: '<div class="panel-group" id="{{panelId}}">' +
                       '<div class="panel panel-default">'+
                           '<div class="panel-heading">'+
                               '<h4 class="panel-title">'+
'<a data-toggle="collapse" data-parent="#{{panelId}}" href="#{{panelBaseId}}-1">Panel Title 1</a>'+
                               '</h4>'+
                           '</div>'+
'<div id="{{panelBaseId}}-1" class="panel-collapse collapse">'+
                               '<div class="panel-body">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</div>'+
                           '</div>'+
                       '</div>'+
                       '<div class="panel panel-default">'+
                           '<div class="panel-heading">'+
                               '<h4 class="panel-title">'+
'<a data-toggle="collapse" data-parent="#{{panelId}}" href="#{{panelBaseId}}-2">Panel Title 1</a>'+
                               '</h4>'+
                           '</div>'+
'<div id="{{panelBaseId}}-2" class="panel-collapse collapse">'+
                               '<div class="panel-body">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</div>'+
                           '</div>'+
                       '</div>'+
                   '</div>',


			link: function postLink(scope, element, attrs) {
				scope.panelBaseId = attrs.collapsePanelBodyId;
				scope.panelId = attr.collapsePanelId;
				//element.text('this is the customAccordion directive');
			}
		};
	});