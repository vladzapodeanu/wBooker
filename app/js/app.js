'use strict';

const eventsApp = angular.module('eventsApp', [ 'ngStorage'])
   // eventsApp.controller(['$locationProvider','$routeProvider', function( $routeProvider, $locationProvider) {
   //      $routeProvider.when('/login',
   //          {
   //              templateUrl:'login.html',
   //              controller: 'app.js'
   //          });
   //      $routeProvider.when('/booking',
   //          {
   //              templateUrl: 'templates/booking.html',
   //              controller: 'app.js'
   //          });
   //      $routeProvider.when('/profile',
   //          {
   //              templateUrl: 'templates/profile.html',
   //              controller: 'app.js'
   //          })
   //      $routeProvider.when('/my-booking',
   //          {
   //              templateUrl: 'templates/mybooking.html',
   //              controller: 'app.js'
   //          });
   //       $routeProvider.otherwise({redirectTo: '/events'});
   //
   //       $locationProvider.html5Mode(true);
   //
   //
   //
   // }]);
eventsApp.controller('MyController', ['$scope', '$http','$localStorage','$sessionStorage', function($scope,$http,$localStorage,$sessionStorage) {

$scope.cartype={
    }
$scope.email = {
    text: 'ionica@gmail.com'
}
$scope.phonenumber = {
    pattern: /^\+?\d{10}$/,
    text: '0746497607'
}
$scope.connect= function(){
    $http({
        method: 'GET',
        url: '/api/user/'
    }).then(function successCallback(response) {
        if(angular.isUndefined(response.data[0])){
            alert("Email doesn't exist in database!");
        }
        else{
            if(response.data[0].password === $scope.password.text){
                $sessionStorage.valueToShare = $scope.email.text;
                window.location.assign("http://localhost:8080/booking");
            }
            else{
                alert("Wrong password!");
            }
        }
    }, function errorCallback(response) {
        console.log("error");
    });
}
$scope.initMyProfile = function () {
    console.log($sessionStorage.valueToShare);
    var email = $sessionStorage.valueToShare;

    $http({
        method: 'GET',
        url: '/api/user/'
    }).then(function successCallback(response) {

        $scope.name = response.data[0].name;
        $scope.email = response.data[0].email;
        $scope.password = response.data[0].password;

        console.log(response);
    }, function errorCallback(response) {
        console.log("error");
    });
}

$scope.update = function(){

    var email = $sessionStorage.valueToShare;

    $http({
        method: 'PUT',
        url: '/api/user/',
        data: {
             'password': $scope.password,
            'name': $scope.name,
            'email': $scope.email
        }
    }).then(function successCallback(response) {
        $sessionStorage.valueToShare = $scope.email;
        console.log($sessionStorage.valueToShare);
        email = $sessionStorage.valueToShare;

        $scope.initMyProfile();
    }, function errorCallback(response) {
        console.log("error");
    });
}



$scope.MyBooking = function () {
    console.log($sessionStorage.valueToShare);
    var email = $sessionStorage.valueToShare;

    $http({
        method: 'GET',
        url: '/api/booking',

    }).then(function successCallback(response) {

        $scope.from_adress = response.data[0].from_adress;
        $scope.to_adress = response.data[0].to_adress;
        $scope.distance = response.data[0].distance;
        $scope.duration = response.data[0].duration;
        $scope.price = response.data[0].price;

        console.log(response);
    }, function errorCallback(response) {
        console.log("error");
    });
}


    $scope.checkcars =function () {


        $http({
            method: 'GET',
            url: 'https://api-test.insoftd.com/v1/operator/car_type?q=[{%22key%22:%22CarType.enabled%22,%22value%22:1,%22op%22:%22=%22}]&order=(CarType.rank%20DESC)',
            header: {'Authorization': 'Basic aW50ZXJuc2hpcEBpbnNvZnRkZXYuY29tOmJhY2tvZmZpY2VAfEAyNDg='},
        }).then(function (data) {
            $scope.cartype=data.data.records;
        });
    }


    $scope.pret =function () {


        $http({
            method: 'POST',
            url: 'https://api-test.insoftd.com/v1/operator/hubble',
            header: {'Authorization': 'Basic aW50ZXJuc2hpcEBpbnNvZnRkZXYuY29tOmJhY2tvZmZpY2VAfEAyNDg='},
            data: {
                "name": "direction",
                "startPoint": {
                    "lat": orig_lat,
                    "lng": orig_long,
                    "address": ''

                },
                "endPoint": {
                    "lat": dest_lat,
                    "lng": dest_long,
                    "address": ''
                },
                "wayPoints": [],
                "app": "backoffice"
            }

        }).then(function (data) {
            $http({
                method: 'POST',
                url: 'https://api-test.insoftd.com/v1/operator/price',
                header: {'Authorization': 'Basic aW50ZXJuc2hpcEBpbnNvZnRkZXYuY29tOmJhY2tvZmZpY2VAfEAyNDg='},
                data: {
                    "price_for_all_car_types": 1,
                    "price_for_all_with_details": 1,
                    "priceList": [
                        {

                            "BookingCharge": {
                                "cash": 0,
                                "credit": 0,
                                "driver_tip": 0
                            },
                            "RouteInfo": {
                                "legs": [
                                    9399
                                ],
                                "duration": $sessionStorage.duration,
                                "distance": $sessionStorage.distance,
                                "points_list": [
                                    {
                                        "type": "p",
                                        "address": '',
                                        "lat": orig_lat,
                                        "lng": orig_long
                                    },
                                    {
                                        "type": "d",
                                        "address": '',
                                        "lat": dest_lat,
                                        "lng": dest_long
                                    }
                                ]
                            },
                            "Booking": {
                                "id_car_type": 1,
                                "infant_seats_number": 0,
                                "child_seats_number": 0,
                                "booster_seats_number": 0,
                                "id_client": null,
                                "pickup_time": "2020-08-07 11:42:00",
                                "passengers_number": 1,
                                "payment_method": "cash",
                                "waiting_time": 0,
                                "voucher_code": null
                            }
                        },
                    ]
                }
            }).then(function successCallback(response) {
                console.log(response);
            }, function errorCallback(response) {
                console.log("error");
            });
        });
        }

    $scope.purcase = function () {

        $http({
            method: 'POST',
            url: 'https://api-test.insoftd.com/v1/operator/booking',
            header: {'Authorization': 'Basic aW50ZXJuc2hpcEBpbnNvZnRkZXYuY29tOmJhY2tvZmZpY2VAfEAyNDg='},
            data:{
                "BookingList": [{
                    "Booking": {
                        "id_car_type": "290",
                        "id_client": "1",
                        "order_number": "",
                        "id_driver_to_car": null,
                        "passenger_name": $sessionStorage.name,
                        "passenger_email": $sessionStorage.email,
                        "passenger_mobile": $sessionStorage.phone_number,
                        "payment_method": "cash",
                        "status": "Unallocated",
                        "source": "backoffice",
                        "infant_seats_number": 0,
                        "child_seats_number": 0,
                        "booster_seats_number": 0,
                        "passengers_number": "4",
                        "pickup_address": '',
                        "dropoff_address": '',
                        "pickup_time": "2020-8-7 12:11:0",
                        "pickup_lat": orig_lat,
                        "pickup_lng": orig_long,
                        "dropoff_lat": dest_lat,
                        "dropoff_lng": dest_long,
                        "duration": $sessionStorage.duration,
                        "journey_distance": $sessionStorage.distance,
                        "waiting_time": 0,
                        "journey_type": "asap",
                        "booking_type": 1,
                        "cancel_reason": null,
                        "id_pickup_zone": "791",
                        "id_dropoff_zone": "791",
                        "pickup_details": "",
                        "dropoff_details": ""
                    },
                    "BookingCharge": {
                        "extra_card_payment": 0,
                        "base_journey_charge": 17.01,
                        "driver_base_journey_charge": 0,
                        "extra_baby_seat": 0,
                        "extra_stow": 5,
                        "duration_charge": 0,
                        "extra_waiting_time": 0,
                        "extra_car_type": 0,
                        "exception": 0,
                        "time_frame": 17.01,
                        "cash": 66.03,
                        "credit": 0,
                        "commission": 0,
                        "discount": 0,
                        "driver_tip": 0,
                        "total_journey": 66.03,
                        "driver_total_journey": 0,
                        "zone_extra_charge": 0,
                        "voucher_discount": 0,
                        "administration_fee": 5,
                        "vat": 22.01,
                        "driver_charges_1": 0,
                        "driver_charges_2": 0,
                        "driver_earnings": 0,
                        "override_driver_earnings": 0,
                        "company_earnings": 0,
                        "pay_to_driver": 0,
                        "pay_to_company": 0,
                        "company_report_income": 0,
                        "company_report_income_vat": 0,
                        "company_report_vat": 0,
                        "percent_driver_total": 0
                    },
                    "JourneyWaypoint": [{
                        "type": "w",
                        "address": '',
                        "lat": orig_lat,
                        "lng": orig_long
                    },
                        {
                            "type": "w",
                            "address": '',
                            "lat": dest_lat,
                            "lng": dest_long
                        }
                    ],
                    "Payment": {
                        "payment_status": "Pending"
                    }

                }]

            }


        }).then(function successCallback(response) {
            console.log(response);
        }, function errorCallback(response) {
            console.log("error");
        });
    }

}]);