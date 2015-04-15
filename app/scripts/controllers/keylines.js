'use strict';

angular.module('graphAngularApp')
	.controller('KeylinesCtrl', function ($scope, neoFactory) {

		var searchType = '';
		var queryChoice = '';

		$scope.setVariables = function (id) {
			searchType = id;
			queryChoice = 'start';
			console.log(searchType);
			console.log(queryChoice);
		};

		/************************************
		 **		   Slide Menu Config	   **
		 ************************************/
		$scope.snapOpts = {
			//disable: 'left'
		};


		/************************************
		 **		KeyLines Directive Config  **
		 ************************************/
		// all keylines events are prefixed with kl and be captured like so:
		$scope.$on('kl', function (event, eventName, componentId, componentType) {

		});

		// example event to listen for
		$scope.$on('kl:click', function (event, componentId, type, id, x, y, button, sub) {

		});

		// event on specific component (specified by id after last colon)
		$scope.$on('kl:ready:chartId', function () {
			$scope.chart.load(randomChart(), function () {
				$scope.chart.layout('standard');
			});
		});

		$scope.selected = [];

		//changing options on the scope will set them on the KeyLines chart itself
		$scope.options = {
			backColour: 'white',
			overview: false,
			controlColour: 'grey',
			selectionColour: '#44D'
		};

		$scope.zoom = function (type) {
			$scope.chart.zoom(type, {
				animate: true,
				time: 400
			});
		};

		$scope.clearSelection = function () {
			$scope.chart.selection([]);
		};

		$scope.options = {
			backColour: 'white',
			overview: false,
			controlColour: 'grey',
			selectionColour: '#44D'
		};


		/************************************
		 **		KeyLines Render Nodes	   **
		 ************************************/
		$scope.renderNode = function () {
			var watchingSearch = $scope.$watch('neoID', function (id) {
				// Need some real handling!!
				if (id !== 'undefined' && id !== null && id !== '') {
					// Call itself to stop watching the input box and take 
					// the last known value before 'search db' is clicked
					watchingSearch();

					neoFactory.callCypher(queryChoice, id)
						.success(function (json, status, headers, config) {
							$scope.neo4jData = json;
							console.log(json.data);
							console.log(neo4jData);
						})
						.error(function (json) {
							console.log(json);
						});
				}
			});

		};


		/************************************
		 **			KeyLines Nodes		   **
		 ************************************/


		/***********************************/
		function randomChart() {
			function randInt(begin, end) {
				return Math.floor(Math.random() * (end - begin)) + begin;
			}
			var items = [];
			for (var i = 0; i < 20; i++) {
				items.push({
					id: 'item' + i,
					type: 'node',
					c: 'rgb(20, 100, 200)',
					t: 'item' + i
				});
				items.push({
					id: 'link' + i,
					type: 'link',
					id1: 'item' + i,
					id2: 'item' + ((i > 10) ? randInt(0, 11) : randInt(11, 20))
				});
			}
			return {
				type: 'LinkChart',
				items: items
			};
		}
	});