'use strict';

angular.module('graphAngularApp')
	.directive('dropDownBtn', function () {


		return {
			restrict: 'E',
			scope: {
				items: '=dropdownData',
				doSelect: '&selectVal',
				selectedItem: '=preselectedItem'
			},
			link: function postLink(scope, element, attrs) {

				var html = '';

				// 
				switch (attrs.menuType) {
				case "button":
					html += '<div class="btn-group"><button class="btn button-label"><span class="glyphicon glyphicon-tags"></span> Type</button><button class="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-expanded="true"><span class="caret"></span></button>'
					break;
				default:
					 html += '<div class="dropdown"><a class="dropdown-toggle" role="button" data-toggle="dropdown"  href="javascript:;">Dropdown<b class="caret"></b></a>';
                    break;
				}
				
				// Appen ul li elements to HTML
				html += 
				

				//element.text('this is the dropDownBtn directive');
			}
		};




	});