'use strict';

angular
	.module('graphAngularApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
	'snap'
  ])
	.config(function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/main.html',
				controller: 'KeylinesCtrl'
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