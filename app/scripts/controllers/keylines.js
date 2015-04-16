'use strict';

angular.module('graphAngularApp')
	.controller('KeylinesCtrl', function ($scope, neoFactory) {

		var searchType = '';
		var queryChoice = '';

		// Variable to check if the chart has been loaded for the first time
		var firstQuery = true;

		var keylinesItems = [];

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
			// Disable touch to drag so users can highlight etc 
			// on the page without pulling out the 
			touchToDrag: false,
			//dragger:null
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
			// Dont like the way it screws up formatting...
			// Look to use a custom modal or something to layer over the top...
			// Have an alert to let the user know what to do
			//$scope.chart.load(randomChart(), function () {
			//	$scope.chart.layout('standard');
			//});
		});

		//$scope.selected = [];

		//changing options on the scope will set them on the KeyLines chart itself
		$scope.options = {
			backColour: 'white',
			overview: false,
			controlColour: 'grey',
			selectionColour: '#24F',
			logo: 'images/logo.png'
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
			var watchingSearch = $scope.$watch('searchInput', function (id) {
				// Need some real handling!!
				if (id !== 'undefined' && id !== null && id !== '') {

					// Call itself to stop watching the input box and take 
					// the last known value before 'search db' is clicked
					watchingSearch();

					//neoFactory.callCypher(queryChoice, id)
					neoFactory.getNode(id)
						.success(function (json) {
						
							console.log(json);
							console.log(JSON.stringify(json));
							// Check if its the first time the chart has been created
							if (firstQuery === true) {
								
								// Set first query to false so nodes retrieved are only 
								firstQuery = false;

								//var newNode = createNode(json.metadata.id, json.metadata, json.data);

								console.log(JSON.stringify(createKeylinesNode(createNode(json.metadata.id, json.metadata, json.data))));
								
								console.log('-------------');
								console.log(createNode(json.metadata.id, json.metadata, json.data));
								console.log('-------------');
								console.log(createKeylinesNode(createNode(json.metadata.id, json.metadata, json.data)));
								
								// Create a node from the neo4j returned REST data - Return var node to createKeylinesNode
								// Create a keylines version of the node and store the existing neo4j version as an attribute - Return var
								// Push the keylines node onto the stack used for the chart
								keylinesItems.push(createKeylinesNode(createNode(json.metadata.id, json.metadata, json.data)));

								$scope.chart.load({
									type: 'LinkChart',
									items: keylinesItems
								}, function(){
									$scope.chart.layout('standard');
								});

								
							} else {

								var newNode = createNode(json.metadata.id, json.metadata, json.data);

								console.log(JSON.stringify(newNode));
								//$scope.chart.expand(randomChart()

							}

						})
						.error(function (json) {

							// Need better error handling depending on the returned error
							console.log(json);
							alert('Sorry we could not find an node with the ID: ' + id);
						});
				}
			});

		};


		/************************************
		 **	 	Create Node Object		   **
		 ************************************
		 **	 merges all the metadata and   **
		 **	 data into one object ready    **
		 **	 for the keylines node func	   **
		 ************************************/
		function createNode(id, metadata, data) {
			var nodeId = JSON.stringify(metadata.id);
			var node = {
				'nodeId': nodeId,
				'metadata': metadata,
				'data': data
			};
			return node;
		}

		/************************************
		 **	 KeyLines Create Node Object   **
		 ************************************
		 **	 Created the keylines object   **
		 **	 ready to be loaded onto the   **
		 **	 chart						   **
		 ************************************/
		function createKeylinesNode(node) {
			// Keylines node
			var keylinesNode = {
				id: node.nodeId,
				type: 'node',
				// get the label based on type and content
				t: node.metadata.labels[0],
				// get the icon based on the labels
				u: 'images/logo.png',
				// cut out circle from original image?
				// ci: true,
				// determine the size of the node
				// e: {:INTEGER}
				// add a glyph if the node needs one
				g: '',
				// save the neo4j item for more information
				d: node
			};
			return keylinesNode;
		}

		/************************************
		 **	  KeyLines Parse Results	   **
		 ************************************/
		function parseResult(json) {
			// Set the neo4j item from the json data
			var neo4jItem = json.data;

			// Create an array for the neo4jItems
			var items = [];

			for (var i = 0; i < neo4jItem.length; i++) {

			}

		}

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
		};

	});