'use strict';

angular.module('graphAngularApp')
	.controller('KeylinesCtrl', function ($scope, neoFactory) {

		/************************************
		 **		   Search Bar Config	   **
		 ************************************/
		$scope.searchDropdownItems = [{
			id: 1,
			name: 'All'
		}, {
			id: 2,
			name: 'ID'
		}, {
			id: 3,
			name: 'People'
		}, {
			id: 4,
			name: 'Organisation'
		}, {
			id: 5,
			name: 'Object'
		}, {
			id: 6,
			name: 'Location'
		}, {
			id: 7,
			name: 'Event'
		}];

		$scope.selectedDropdownItem = 1;

		/************************************
		 **			Left Menu Config	   **
		 ************************************/
		$scope.menuItems = [{
			id: 1,
			header: 'Open'
		}, {
			id: 2,
			header: 'Save',
			items: [
				{
					name: 'Save Chart'
				}, {
					name: 'Save Chart AS'
				}]
		}, {
			id: 3,
			header: 'Drawables',
			items: [
				{
					id: 1,
					imgName: 'academic'
				}, {
					id: 2,
					imgName: 'address'
				}, {
					id: 3,
					imgName: 'airport'
				}, {
					id: 4,
					imgName: 'car'
				}, {
					id: 5,
					imgName: 'child'
				}, {
					id: 6,
					imgName: 'coach'
				}, {
					id: 7,
					imgName: 'company'
				}, {
					id: 8,
					imgName: 'document'
				}, {
					id: 9,
					imgName: 'email'
				}, {
					id: 10,
					imgName: 'event'
				}, {
					id: 11,
					imgName: 'father'
				}, {
					id: 12,
					imgName: 'flight'
				}, {
					id: 13,
					imgName: 'group'
				}, {
					id: 14,
					imgName: 'id'
				}, {
					id: 15,
					imgName: 'location'
				}, {
					id: 16,
					imgName: 'man'
				}, {
					id: 17,
					imgName: 'mobile'
				}, {
					id: 18,
					imgName: 'mother'
				}, {
					id: 19,
					imgName: 'passport'
				}, {
					id: 20,
					imgName: 'pencil'
				}, {
					id: 21,
					imgName: 'plane'
				}, {
					id: 22,
					imgName: 'ship'
				}, {
					id: 23,
					imgName: 'telephone'
				}, {
					id: 24,
					imgName: 'unknown'
				}, {
					id: 25,
					imgName: 'woman'
				}
			]
		}];

		/************************************
		 **		   	   **
		 ************************************/

		/************************************
		 **		   Slide Menu Config	   **
		 ************************************/

		$scope.snapOpts = {
			// Disable touch to drag so users can highlight etc 
			// on the page without pulling out the 
			touchToDrag: false
		};


		/************************************
		 **		KeyLines Config			  **
		 ************************************/

		var keylinesItems = [];
		//var keylinesRelationships = [];

		// Variable to check if the chart has been loaded for the first time
		var firstQuery = true;

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
			logo: 'assets/homeoffice.png'
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

		$scope.standardLayout = function () {
			$scope.chart.layout('standard', {fit: true, animate: true, tidy: true});
		};


		/************************************
		 **		KeyLines Render Nodes	   **
		 **		Search the database btn	   **
		 ************************************/
		var watchingForSearchChart = $scope.$watch('searchInput', function (searchTerm) {
			// Call itself to stop watching the input box and take 
			// the last known value before 'search db' is clicked
			//watchingSearch();

			centreSelected(searchTerm);
		});

		$scope.searchChart = function () {
			var watchingSearch = $scope.$watch('searchInput', function (searchTerm) {
				// Call itself to stop watching the input box and take 
				// the last known value before 'search db' is clicked
				watchingSearch();

				selectName(searchTerm);
			});

		};

		function centreSelected(name) {
			var selection = selectName(name);
			if (selection) {
				$scope.chart.pan('selection', {
					animate: true,
					time: 300
				});
				$scope.chart.ping(selection);
			}
		};

		function selectName(name) {
			// Regex for: label text starts with 'name' (ignoring case-sensitive)	
			var searchRegex = new RegExp('^' + name, 'im');
			// no name: clear the selection
			if (!name) {
				// For some reason this re
				//$scope.chart.selection([]);
				return;
			}
			var result = [];
			// iterate over every node and test if it matches the name we are searching for
			$scope.chart.each({
				type: 'node'
			}, function (item) {
				if (searchRegex.test(item.t)) {
					result.push(item.id);
				}
			});
			return $scope.chart.selection(result);
		};

		/************************************
		 **		KeyLines Render Nodes	   **
		 **		Search the database btn	   **
		 ************************************/
		$scope.renderNode = function () {
			var watchingSearch = $scope.$watch('searchInput', function (id) {
				// Need some real handling!!
				if (id !== 'undefined' && id !== null && id !== '') {

					// Call itself to stop watching the input box and take 
					// the last known value before 'search db' is clicked
					watchingSearch();

					$scope.isLoadingImage = true;
					// Call the node GET from the neo factory
					neoFactory.getNode(id).then(function (json) {

						// Create a node from the neo4j returned REST data - Return var node to createKeylinesNode
						// Create a keylines version of the node and store the existing neo4j version as an attribute - Return var
						// Push the keylines node onto the stack used for the chart

						createNode(json.data.metadata.id, json.data.metadata, json.data.data);

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

		function createNode(id, metadata, data, firstQuery) {

			var nodeId = JSON.stringify(metadata.id);
			var relationships, node;
			neoFactory.getRelationshipsOfNode(id)
				.then(function (json) {

					relationships = calculateRels(json.data, metadata.id);
					node = {
						'nodeId': nodeId,
						'metadata': metadata,
						'data': data,
						'relationships': relationships
					}


					// Parse the node into the keylines format
					createKeylinesNode(node);
					//console.log(JSON.stringify(relationships.original));
				});

		}

		function calculateRels(json, nodeId) {
			var original = json,
				inCount = 0,
				outCount = 0,
				relationships;
			for (var i = 0; i < json.length; i++) {
				if (String(json[i].end.slice(-1)) !== String(nodeId)) {
					outCount++;
				} else {
					inCount++;
				}
			}
			relationships = {
				'inCount': inCount,
				'outCount': outCount,
				'original': json
			};
			return relationships;
		}

		/************************************
		 **	 KeyLines Create Node Object   **
		 ************************************
		 **	 Created the keylines object   **
		 **	 ready to be loaded onto the   **
		 **	 chart						   **
		 ************************************/
		function createKeylinesNode(node) {

			//console.log(node);

			// Keylines node
			var keylinesNode = {
				id: node.nodeId,
				type: 'node',
				// get the label based on type and content
				t: node.metadata.labels[0] + '\n' + node.data.name,
				// get the icon based on the labels
				u: getNodeType(node),
				// cut out circle from original image?
				// ci: true,
				// determine the size of the node
				// e: {:INTEGER}
				// add a glyph if the node needs one
				g: getGlyphs(node.relationships),
				// save the neo4j item for more information
				d: node
			};

			//var items = [];
			keylinesItems.push(keylinesNode);
			keylinesItems = keylinesItems.concat(createKeylinesRelationships(node.relationships.original));

			console.log(keylinesItems);

			if (!firstQuery) {
				// expand(items, options, callback)
				$scope.chart.expand(keylinesItems, {
					fit: true
				}, function () {
					$scope.chart.layout('standard', {fit: true, animate: true, tidy: true});
				});

				// stop showing the loading gif
				$scope.isLoadingImage = false;
			} else {
				firstQuery = false;

				$scope.chart.load({
					type: 'LinkChart',
					items: keylinesItems
				}, function () {
					$scope.chart.layout('standard', {fit: true, animate: true, tidy: true});
					// stop showing the loading gif
					$scope.isLoadingImage = false;
				});
			}

		}

		/************************************
		 **	 KeyLines Create Relationship  **
		 ***********************************/
		function getGlyphs(relationships) {
			var glyphArray = [];

			glyphArray.push({
				c: 'rgb(255,0,0)',
				p: 'ne',
				t: 'in'
			}, {
				c: 'rgb(0,0,205)',
				p: 'nw',
				t: 'out'
			}, {
				c: 'rgb(255,0,0)',
				p: 'se',
				t: relationships.inCount
			}, {
				c: 'rgb(0,0,205)',
				p: 'sw',
				t: relationships.outCount
			});


			//console.log(glyphArray)
			return glyphArray;
		}

		/************************************
		 **	 KeyLines Create Relationship  **
		 ************************************
		 [{"start":"http://localhost:7474/db/data/node/5","data":{},"property":"http://localhost:7474/db/data/relationship/0/properties/{key}","self":"http://localhost:7474/db/data/relationship/0","properties":"http://localhost:7474/db/data/relationship/0/properties","type":"FRIENDS","extensions":{},"end":"http://localhost:7474/db/data/node/2","metadata":{"id":0,"type":"FRIENDS"}},{"start":"http://localhost:7474/db/data/node/1","data":{},"property":"http://localhost:7474/db/data/relationship/2/properties/{key}","self":"http://localhost:7474/db/data/relationship/2","properties":"http://localhost:7474/db/data/relationship/2/properties","type":"BFF4EVZ","extensions":{},"end":"http://localhost:7474/db/data/node/2","metadata":{"id":2,"type":"BFF4EVZ"}},{"start":"http://localhost:7474/db/data/node/7","data":{},"property":"http://localhost:7474/db/data/relationship/3/properties/{key}","self":"http://localhost:7474/db/data/relationship/3","properties":"http://localhost:7474/db/data/relationship/3/properties","type":"DRIVINGBUDDIES","extensions":{},"end":"http://localhost:7474/db/data/node/2","metadata":{"id":3,"type":"DRIVINGBUDDIES"}},{"start":"http://localhost:7474/db/data/node/2","data":{},"property":"http://localhost:7474/db/data/relationship/4/properties/{key}","self":"http://localhost:7474/db/data/relationship/4","properties":"http://localhost:7474/db/data/relationship/4/properties","type":"EATS","extensions":{},"end":"http://localhost:7474/db/data/node/6","metadata":{"id":4,"type":"EATS"}}]
		 ************************************/


		function createKeylinesRelationships(relationshipArray) {
			// Loop throught the array
			for (var i = 0; i < relationshipArray.length; i++) {
				//console.log(relationshipArray[i]);
				// Get the start and end variables
				var id1 = cleanURL(relationshipArray[i].start),
					id2 = cleanURL(relationshipArray[i].end);

				// Create a link 
				// Push onto the Keylines Relationships Array
				var link = {
						type: 'link',
						id1: id1,
						id2: id2,
						id: id1 + '-' + id2,
						t: relationshipArray[i].type,
						fc: 'rgba(52,52,52,0.9)',
						// draw an arrow
						a2: true,
						c: 'rgb(0,153,255)',
						w: 2,
						// glyph
						//g: getGlyphs(item),
						// save the item for future use
						d: relationshipArray[i]
					}
					//console.log(link);
					//keylinesItems.push(link);
				return link;
			}
		}


		/************************************
		 **	 KeyLines Get Node Icon   **
		 ************************************
		 **	 Function to find out what the **
		 **  Node labels and deduce what   **
		 **	 icon should be displayed	   **
		 ************************************/
		function getNodeType(node) {

			// We can either take the simple route which is what is the label set to in the keylines object. e.g. t: "User" which is always the first options from the metadata label array
			// Or we can go into the d: metadata object which contains all the information present in neo4j
			// The current option is to evaluate the metadata and determine the choice
			var icon = '';

			// Check that the icon array is < 
			if (node.metadata.labels.length > 1) {
				//console.log(node.metadata.labels);
				for (var i = 0; i < node.metadata.labels.length; i++) {
					if (node.metadata.labels[i] === 'Person' || node.metadata.labels[i] === 'Object' || node.metadata.labels[i] === 'Location' || node.metadata.labels[i] === 'Event') {
						// Do something around gender of person
						if (node.metadata.labels[i] === 'Person') {
							//							console.log(node);
							icon = node.data.gender === 'F' ? 'images/woman.png' : 'images/man.png';;
							//console.log(icon);
							break;
						}
						//else if (){} 
						else {
							icon = 'images/' + node.metadata.labels[i].toLowerCase() + '.png';
							//console.log(icon);
							break;
						}
					}
				}
			} else {
				// Dont forget to get the file type? 
				// Could do something sensible around this!
				icon = 'images/' + node.metadata.labels[0].toLowerCase() + '.png';
				//console.log(icon);
				//break;
			}


			return icon;
		}

		/************************************
		 **	  			Clean URLs		   **
		/************************************
		 **  Cleans urls to return the ID  **
		 ************************************/
		function cleanURL(url) {
			return url.substring(url.lastIndexOf('/') + 1);
		}


		/************************************
		 **			Save Chart Config	   **
		 ************************************/
		// Count how many charts have been saved
		var counter = 1;
		// Object to store all the serialised objects
		// This could then be a AJAX call to put into a database
		$scope.chartStore = {};
		// 
		var hasLoaded = true;

		$scope.saveChart = function (evt) {

			var canSave = true // this should check if the button is disabled

			if (canSave) {
				// Serialise the current chart
				var chartState = $scope.chart.serialize();

				// Save a small image thumbnail of the chart
				var chartImage = $scope.chart.toDataURL(630, 470, {
					noScale: false,
					selection: true,
					fit: 'exact'
				});

				// Set the name for the chart
				// this could be the user name instead of just chart
				var chartName = 'Chart ' + counter + ' - Saved @ ' + getTime();
				counter++;

				// Save the chart
				// Serialising the chart to local storage 
				// but can send via AJAX
				$scope.chartStore[chartName] = {
					'chartSessionId': counter,
					'chartName': chartName,
					'chartState': chartState,
					'chartImage': chartImage
				};

			}

		}


		function getTime() {
			var now = new Date();
			var h = now.getHours();
			var m = now.getMinutes();
			var s = now.getSeconds();

			return h + (m < 10 ? ":0" : ":") + m + (s < 10 ? ":0" : ":") + s;
		}

		// Function to restore the graph
		$scope.restoreChart = function (chartName) {
			// disable the button 
			//	

			var previousSave = $scope.chartStore[chartName];

			// Set the restore flag to false
			//hasLoaded = false;

			// Restore the data
			$scope.chart.load(previousSave.chartState, function () {
				// From now on capture events
				hasLoaded = true
			});

		}

		/***********************************************************************************************************************************/

		/************************************
		 **		Populate Test Data to	   **
		 **				chart			   **
		 ************************************/
		$scope.testDataPopulate = function () {
			for (var i = 0; i < 8; i++) {
				$scope.isLoadingImage = true;
				// Call the node GET from the neo factory
				neoFactory.getNode(i).then(function (json) {

					// Create a node from the neo4j returned REST data - Return var node to createKeylinesNode
					// Create a keylines version of the node and store the existing neo4j version as an attribute - Return var
					// Push the keylines node onto the stack used for the chart

					createNode(json.data.metadata.id, json.data.metadata, json.data.data);

					$scope.chart.layout('structural');
				});
			}

		};

	});