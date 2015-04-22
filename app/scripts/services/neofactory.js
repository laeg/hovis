'use strict';

angular.module('graphAngularApp')
	.factory('neoFactory', ['$http', '$q', function ($http, $q) {
		var urlBase = 'http://localhost:7474/db/data/';

		var neoFactory = {};

		var queryString, params;

		var headers = {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Authorization': 'Basic bmVvNGo6YWRtaW4='
		};

		/************************************
		 **			KeyLines Queries	   **
		 ************************************/
		var queryTemplates = {
			start: 'START n=node({id}) \n' + 'MATCH (n)-[r]->(e) \n' + 'RETURN n, labels(n), r, e, labels(e) \n' + 'LIMIT 10'
			//start: 'START n=node({id}) MATCH (n)-[r]->(e) RETURN n, labels(n), r, e, labels(e) LIMIT 10'
		};

		/************************************
		 **			GET - Node			   **
		 **			@param - nodeId		   **
		 ************************************/
//		neoFactory.getNode = function (nodeId) {
//			// create get URL of
//			// http://localhost:7474/db/data/node/:id
//			var nodeUrl = urlBase + 'node/' + nodeId;
//		
//			// On complete return success or error response back to Ctrler
//			return $http.get(nodeUrl, {
//				method: 'GET',
//				headers: headers,
//				dataType: 'json'
//			},headers);
//		};
		
		var getNode = function (nodeId) {
			var deferred = $q.defer();
			
			// create get URL of
			// http://localhost:7474/db/data/node/:id
			var nodeUrl = urlBase + 'node/' + nodeId;
		
			// On complete return success or error response back to Ctrler
			deferred.resolve($http.get(nodeUrl, {
				method: 'GET',
				headers: headers,
				dataType: 'json'
			},headers));
			
			return deferred.promise;
		};
		
		/************************************
		 **			GET - Relationships			   **
		 **			@param - nodeId		   **
		 ************************************/
//		neoFactory.getRelationshipsOfNode = function (nodeId) {
//			// create get URL of
//			// URL BASE
//			// 'http://localhost:7474/db/data/';
//			// http://localhost:7474/db/data/node/:id/relationships/all"
//			var nodeUrl = urlBase + 'node/' + nodeId + '/relationships/all';
//		
//			// On complete return success or error response back to Ctrler
//			return $http.get(nodeUrl, {
//				method: 'GET',
//				headers: headers,
//				dataType: 'json'
//			},headers);
//		};
		
		var getRelationshipsOfNode = function (nodeId) {
			var deferred = $q.defer();
			
			// create get URL of
			// URL BASE
			// 'http://localhost:7474/db/data/';
			// http://localhost:7474/db/data/node/:id/relationships/all"
			var nodeUrl = urlBase + 'node/' + nodeId + '/relationships/all';
		
			// On complete return success or error response back to Ctrler
			deferred.resolve($http.get(nodeUrl, {
				method: 'GET',
				headers: headers,
				dataType: 'json'
			},headers));		
			
			return deferred.promise;
		};
		
		
		
		 /************************************
		 **				Call Cypher		   **
		 ************************************/
		neoFactory.callCypher = function (queryChoice, params) {
			// work out which query is being called?


			queryString = queryTemplates.start;
			params = {
				id: params
			};

			var data = JSON.stringify({
				query: queryString,
				params: params
			});

			console.log(data);

			return $http.post(urlBase + 'cypher', {
				type: 'POST',
				headers: headers,
				data: data,
				dataType: 'json'
			}, headers);

		};

//		return neoFactory;
		return {
			getNode : getNode,
			getRelationshipsOfNode : getRelationshipsOfNode
		}
  }]);