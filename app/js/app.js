'use strict';

const eventsApp = angular.module('eventsApp', ['ngResource', 'ngRoute'])
    .config(function($routeProvider, $locationProvider) {
        $routeProvider.when('/login',
            {
                templateUrl:'templates/login.html',
                controller: 'LoginCtrl'
            });
        $routeProvider.when('/booking',
            {
                templateUrl: 'templates/booking.html',
                controller: 'BookingCtrl'
            });
        $routeProvider.when('/profile',
            {
                templateUrl: 'templates/profile.html',
                controller: 'ProfileCtrl'
            })

        $routeProvider.otherwise({redirectTo: '/events'});

        $locationProvider.html5Mode(true);

    });
