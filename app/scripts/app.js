'use strict';

angular
	.module('graphAngularApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'snap',
	'angularAccordion'
  ])
	.config(function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/main.html',
				controller: 'MainCtrl'
			})
			.when('/help', {
				templateUrl: 'views/help.html',
				controller: 'HelpCtrl'
			})
			.when('/test', {
				templateUrl: 'views/test.html',
				controller: 'TestCtrl'
			})
			.when('/keylines', {
				templateUrl: 'views/keylines.html',
				controller: 'KeylinesCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});
	});