'use strict';

// shim Object.create
if (typeof Object.create !== 'function') {
  Object.create = (function() {
    var Temp = function() {};
    return function (prototype) {
      if (arguments.length > 1) {
        throw new Error('Second argument not supported');
      }
      if (typeof prototype !== 'object') {
        throw new TypeError('Argument must be an object');
      }
      Temp.prototype = prototype;
      var result = new Temp();
      Temp.prototype = null;
      return result;
    };
  })();
}

angular.module('graphAngularApp')
	.factory('klComponent', ['$rootScope', function ($rootScope) {

		//Note this is complex due to some calls being async. Async calls change scope only once complete.
		function wrap(fn, afterFn) {
			return function () {
				var args = [].slice.call(arguments);
				//not a particularly safe test as the function might be called with the wrong args. would be better
				//long term to know which functions are async beforehand via a function definition map.
				var async = args.length && angular.isFunction(args[args.length - 1]);
				if (async) {
					//invoke the function call but use a different callback
					var cb = args.pop();
					args.push(function () {
						var cbargs = [].slice.call(arguments);
						cb.apply(null, cbargs);
						afterFn();
					});
					return fn.apply(null, args);
				} else {
					//invoke the function
					var res = fn.apply(null, args);
					afterFn();
					//now we need to do some further wrapping in case the function has returned
					//an object that has further functions on it. this is the case for the graph and
					//combo namespaces
					return wrapObject(res, afterFn);
				}
			};
		}

		// Wrap the KeyLines object so that everytime a function is called we can do something (update our isolate scope)
		function wrapObject(obj, afterFn) {
			if (angular.isObject(obj)) {
				// wrap in the right way the given object
				var ret = angular.isArray(obj) ? [] : {};
				// use the angular iterator
				angular.forEach(obj, function (value, key) {
					if (angular.isFunction(value)) {
						ret[key] = wrap(value, afterFn);
					} else {
						//just add the other values. note this means that the wrapping will
						//only work on functions on the top level object, not any sub object functions
						ret[key] = value;
					}
				});
				return ret;
			} else {
				//string, number, boolean, undefined, null
				return obj;
			}
		}

		var eventPrefix = 'kl',
			eventJoiner = ':';

		function ngName(name) {
			return 'kl' + capitalize(name);
		}

		function capitalize(name) {
			return name.charAt(0).toUpperCase() + name.slice(1);
		}

		// 3 events are broadcast, this is not inefficient as it only does something when there are listeners present
		function broadcast(eventName, componentId, eventData) {
			eventData = angular.isArray(eventData) ? eventData : [eventData];
			// broadcast an event based on our top-level event prefix 'kl'
			$rootScope.$broadcast.apply($rootScope, [eventPrefix, eventName, componentId].concat(eventData));
			// broadcast another event based on type (chart/timebar)
			$rootScope.$broadcast.apply($rootScope, [[eventPrefix, eventName].join(eventJoiner)].concat([componentId]).concat(eventData));
			// broadcast one more event scoped to kl prefix, type, and the id of the component
			$rootScope.$broadcast.apply($rootScope, [[eventPrefix, eventName, componentId].join(eventJoiner)].concat(eventData));
		}

		// component setup: things shared between timebar and chart
		var klComponent = {
			// helper method to configure keylines from directive attributes
			config: function (base) {
				KeyLines.paths({
					assets: base + 'assets/',
					flash: {
						swf: base + 'swf/keylines.swf',
						swfObject: base + 'js/swfobject.js',
						expressInstall: base + 'swf/expressInstall.swf'
					},
					images: base,
				});
			},
			wrapObject: wrapObject,
			broadcast: broadcast,
			// create a KeyLines component
			create: function (id, type, callback) {
				KeyLines.create({
					id: id,
					type: type
				}, function (err, component) {
					callback(component);
					// bind all KeyLines events to be broadcast by our angular event broadcast system
					component.bind('all', function (eventName) {
						if (eventName !== 'redraw') {
							var params = [type].concat(Array.prototype.slice.call(arguments, 1));
							broadcast(eventName, id, params);
						}
					});
				});
			}
		};
		return klComponent;
  }]);