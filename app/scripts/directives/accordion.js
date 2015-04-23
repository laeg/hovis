'use strict';

angular.module('graphAngularApp')
  .directive('accordion', function () {
    return {
      template: '<di id="{{parentId}}">'+
				'</div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        //element.text('this is the accordion directive');
      }
    };
  });
