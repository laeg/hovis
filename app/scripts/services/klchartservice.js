'use strict';

angular.module('graphAngularApp')
  .factory('klChartService', ['klComponent', function (klComponent) { 

    var klChartService = Object.create(klComponent);

    klChartService.create = function (elemId, callback) {
      klComponent.create(elemId, 'chart', callback);
    };

    return klChartService;

  }]);