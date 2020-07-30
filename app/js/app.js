'use strict';

const eventsApp = angular.module('eventsApp', ['ngResource', 'ngRoute','ngStorage'])
    .controller('Controller',['$scope', '$http','$locationProvider','$sessionStorage','$localStorage','$sessionStorage', function($scope, $http, $routeProvider, $locationProvider, $localStorage, $sessionStorage) {
        $routeProvider.when('/login',
            {
                templateUrl:'login.html',
                controller: 'logCtrl'
            });
        $routeProvider.when('/booking',
            {
                templateUrl: 'templates/booking.html',
                controller: 'bookingCtrl'
            });
        $routeProvider.when('/profile',
            {
                templateUrl: 'templates/profile.html',
                controller: 'accountCtrl'
            })
        $routeProvider.when('/my-booking',
            {
                templateUrl: 'templates/mybooking.html',
                controller: 'myBookingCtrl'
            });
        $routeProvider.otherwise({redirectTo: '/events'});

        $locationProvider.html5Mode(true);



        $scope.email = {
            text: 'me@example.com'
        };
        $scope.phonenumber = {
            pattern: /^\+?\d{10}$/,
            text: '0720123123'
        }
        $scope.createLogin = function(){
            $http({
                method: 'GET',
                url: '/api/user/' + $scope.email.text
            }).then(function successCallback(response) {
                if(angular.isUndefined(response.data[0])){
                    alert("Email-ul nu este in baza de date");
                }
                else{
                    if(response.data[0].password === $scope.password.text){
                        $sessionStorage.valueToShare = $scope.email.text;
                        window.location.assign("http://localhost:8080/booking");
                    }
                    else{
                        alert("Parola Gresita!");
                    }
                }
            }, function errorCallback(response) {
                console.log("error");
            });
        }

        $scope.initMyProfile = function(){
            console.log($sessionStorage.valueToShare);
            var email = $sessionStorage.valueToShare;

            $http({
                method: 'GET',
                url: '/api/user/' + email
            }).then(function successCallback(response) {

                $scope.name = response.data[0].name;
                $scope.adress = response.data[0].adress;
                $scope.emailP = response.data[0].email;
                $scope.phoneNumber = response.data[0].phone_number;

                console.log(response);
            }, function errorCallback(response) {
                console.log("error");
            });
        }

        $scope.updateDetails = function(){

            var email = $sessionStorage.valueToShare;

            $http({
                method: 'PUT',
                url: '/api/user/' + email
            }).then(function successCallback(response) {



                console.log(response);
            }, function errorCallback(response) {
                console.log("error");
            });
        }

    }]);
