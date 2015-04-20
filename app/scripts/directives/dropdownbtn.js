'use strict';

angular.module('graphAngularApp')
	.directive('dropDownBtn', function ($compile) {


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
				case 'button':
					html += '<div class="btn-group"><button class="btn button-label"><span class="glyphicon glyphicon-tags"></span> Type</button><button class="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-expanded="true"><span class="caret"></span></button>';
					break;
				default:
					html += '<div class="dropdown"><a class="dropdown-toggle" role="button" data-toggle="dropdown"  href="javascript:;">Dropdown<b class="caret"></b></a>';
					break;
				}

				// Appen ul li elements to HTML
				html += '<ul class="dropdown-menu"><li ng-repeat="item in items"><a tabindex="-1" data-ng-click="selectVal(item)">{{item.name}}</a></li></ul></div>';
				element.append($compile(html)(scope));
				
				// Loop through and grab each item
				for (var i = 0; i < scope.items.length; i++) {
					if (scope.items[i].id === scope.selectedItem) {
						scope.bSelectedItem = scope.items[i];
						break;
					}
				}

				// Changes the button name and type
				scope.selectVal = function (item) {
					switch (attrs.menuType) {
					case 'button':
						$('button.button-label', element).html(item.name);
						break;
					default:
						$('a.dropdown-toggle', element).html('<b class="caret"></b> ' + item.name);
						break;
					}
					scope.doSelect({
						selectedVal: item.id
					});
				};
				scope.selectVal(scope.bSelectedItem);
			}
		};
	});