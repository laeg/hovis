'use strict';

angular.module('graphAngularApp')
  .directive('klChart', ['klChartService', '$timeout', function (klChartService, $timeout) { 

  return {
    restrict: 'A',  

    scope: {
      klOptions: '=',
      klSelected: '=',
      klChart: '='
    },

    controller: function ($scope) {
      // changes to a user-defined klOptions object will update KeyLines chart accordingly
      $scope.$watch('klOptions', function (val) {
        if ($scope.chart && val) {
          $scope.chart.options(val);
        }
      }, true); //true to watch deep
      // changes to a user-defined klSelected will set chart properties
      $scope.$watch('klSelected', function (val) {
        if ($scope.chart && val) {
          $scope.chart.setProperties(val);
        }
      }, true); //true to watch deep
    },

    link: function (scope, element, attrs) {
      var id = element[0].id;

      scope.$on('kl:selectionchange:' + id, function (event) {
        scope.$apply(function () {
          scope.klSelected = scope.chart.getItem(scope.chart.selection());
        });
      });

      function updateIsolateScope () {
        // needs timeout so that the $watch in controller can run first... (try not using $timeout then clicking turnGrey in angular demo and only tb goes grey)
        $timeout(function () {
          scope.klSelected = scope.chart.getItem(scope.chart.selection());
          scope.klOptions = scope.chart.options();
        });
      }

      //the base path is where KeyLines will load both its core files (the swf files, etc) and also its assets
      // - must include an ending / slash
      klChartService.config(attrs.klBasePath);

      // finally, we will create a new KeyLines chart
      klChartService.create(id, function (component) {
        // this chart reference is a standard KeyLines chart and is used internally in this directive only (to avoid recursion on klChart)
        scope.chart = component;
        // this reference is for a users' controllers (a wrapped instance of KeyLines)
        scope.klChart = klChartService.wrapObject(component, updateIsolateScope);
        /*
         * WARNING: This is a bit of a nasty caveat
         * We must broadcast the ready event only after scope.klChart has been setup
         * Angular sets up scope.klChart sometime after our assignment in another digest cycle
         * We must wait for that previous digest cycle to finish before we broadcast the ready event,
         * that way we can be sure that any listeners on the ready event will have access to the scope.klChart
         * $timeout is the way to run this after the current digest cycle (queued for when it is available)
         */
        $timeout(function () {
          // This digest call is necessary to make flash work (can be removed if you only want to support canvas)
          scope.$digest();
          klChartService.broadcast('ready', id);
        });
      });

    }
  };

}]);