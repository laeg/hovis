'use strict';

angular.module('graphAngularApp')
  .factory('personFactory', ['$http', function ($http) {
    var urlBase = 'http://localhost:3000/person';
	var personFactory = {};
	
	// Get which returns if the API is active
	personFactory.testConnection = function () {
		return $http.get(urlBase);
	}
	  
	// Get a node data from the API
	// http://localhost:3000/person/nodes/find/id/:id
	personFactory.getNode = function (id) {
		return $http.get(urlBase + '/nodes/find/id/' +  id );
	}
	  	
	return personFactory;
  });
