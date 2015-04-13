'use strict';

angular.module('graphAngularApp')
  .directive('klTimebar', ['klTimebarService', '$timeout', function (klTimebarService, $timeout) {

    return {

      restrict: 'A',  

      scope: {
        klOptions: '=',
        klTimebar: '='
      },

      controller: function ($scope) {
        $scope.$watch('klOptions', function (val) {
          if ($scope.timebar && val) {
            $scope.timebar.options(val);
          }
        }, true);
      },

      link: function (scope, element, attrs) {

        var id = element[0].id;

        function updateIsolateScope () {
          // needs timeout so that the $watch in controller can run first... (try not using $timeout then clicking turnGrey in angular demo and only tb goes grey)
          $timeout(function () {
            scope.klOptions = scope.timebar.options();
          });
        }

        //the base path is where KeyLines will load both its core files (the swf files, etc) and also its assets
        // - must include an ending / slash
        klTimebarService.config(attrs.klBasePath);

        klTimebarService.create(id, function (component) {
          scope.timebar = component;
          scope.klTimebar = klTimebarService.wrapObject(component, updateIsolateScope);
          /*
           * WARNING: This is a bit of a nasty caveat
           * We must broadcast the ready event only after scope.klTimebar has been setup
           * Angular sets up scope.klTimebar sometime after our assignment in another digest cycle
           * We must wait for that previous digest cycle to finish before we broadcast the ready event,
           * that way we can be sure that any listeners on the ready event will have access to the scope.klTimebar
           * $timeout is the way to run this after the current digest cycle (queued for when it is available)
           */
          $timeout(function () {
            // This digest call is necessary to make flash work (can be removed if you only want to support canvas)
            scope.$digest();
            klTimebarService.broadcast('ready', id);
          });
        });

      }
    };
  }]);
