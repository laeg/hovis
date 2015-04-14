'use strict';

angular.module('graphAngularApp')
	.factory('neoFactory', ['$http', function ($http) {
		var urlBase = 'http://localhost:7474/db/data/cypher';

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

			//console.log('IM IN');
			//console.log(queryChoice);
			//console.log(params);
			console.log(JSON.stringify({
				query: queryString,
				params: params
			}));


			//delete $http.defaults.headers.common['X-Requested-With'];
			// change the parameters
			//$http.defaults.headers.common['Authorization'];


			return $http.post(urlBase, {
				headers: headers,
				data: JSON.stringify({
					query: queryString,
					params: params
				}),
				dataType: 'json'
			});
			//return $http.post({
			//	url: urlBase,
			//	type: 'POST',
			//	data: JSON.stringify({
			//		query: queryString,
			//		params: params
			//	}),
			//	dataType: 'json',
			//	headers: headers
			//});
		};

		return neoFactory;
  }]);