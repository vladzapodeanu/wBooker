'use strict';

eventsApp.controller('MainMenuController',
    function MainMenuController($scope, $location) {
        console.log('absUrl:', $location.absUrl());
        console.log('protocol:', $location.protocol());
        console.log('port:', $location.port());
        console.log('host:', $location.host());
        console.log('path:', $location.path());
        console.log('search:', $location.search());
        console.log('hash:', $location.hash());
        console.log('url:', $location.url());
        $scope.createBooking = function() {
            $location.replace();
            $location.url('/booking');
        };
        $scope.viewBooking = function() {
            $location.replace();
            $location.url('/my-booking');
        };
        $scope.createLogin = function() {
            $location.replace();
            $location.url('/login');
        };
        $scope.editProfile = function() {
            $location.replace();
            $location.url('/profile');
        }
    })