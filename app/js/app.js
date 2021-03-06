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

$scope.carTypes={
    };
$scope.email = {
   };
$scope.phonenumber = {
    pattern: /^\+?\d{10}$/,

};
$scope.connect= function(){
    $http({
        method: 'GET',
        url: '/api/user/userEmail/' + $scope.email.text
    }).then(function successCallback(response) {
        if (angular.isUndefined(response.data[0])) {
            alert("Email-ul nu este in baza de date");
        } else {
            if (response.data[0].password === $scope.password.text) {
                $sessionStorage.valueEmail = $scope.email.text;
                $sessionStorage.valueId = response.data[0].id_user;
                $sessionStorage.name = response.data[0].name;
                $sessionStorage.phone_number = response.data[0].phone_number;
                window.location.assign("http://localhost:8080/booking");
            } else {
                alert("Parola Gresita!");
            }
        }
    }, function errorCallback(response) {
        console.log("error");
    });
}
$scope.checkcars =function () {
    $http({
        method: 'GET',
        url: 'https://api-test.insoftd.com/v1/operator/car_type?q=[{%22key%22:%22CarType.enabled%22,%22value%22:1,%22op%22:%22=%22}]&order=(CarType.rank%20DESC)',
        headers: {'Authorization': 'Basic aW50ZXJuc2hpcEBpbnNvZnRkZXYuY29tOmJhY2tvZmZpY2VAfEAyNDg='},
    }).then(function (data) {
        $scope.carTypes=data.data.records;
    });
}

$scope.mybooking = function(){
    $http({
        method: 'GET',
        url: '/api/booking/' + $sessionStorage.valueId
    }).then(function (data){
        $scope.bookings=data.data;
    });
}

$scope.initMyProfile = function () {
    var user_id = $sessionStorage.valueId;

    $http({
        method: 'GET',
        url: '/api/user/' + user_id

    }).then(function successCallback(response) {

        $scope.name = response.data[0].name;
        $scope.emailprofile = response.data[0].email;
        $scope.password = response.data[0].password;


    }, function errorCallback(response) {
        console.log("error");
    });
}

$scope.update = function(){

    var email = $sessionStorage.valueToShare;
    var user_id = $sessionStorage.valueId;
    $http({
        method: 'PUT',
        url: '/api/user/' + user_id ,
        data: {

            'name': $scope.name,
            'email': $scope.emailprofile,
            'password': $scope.password

        }
    }).then(function successCallback(response) {
        $sessionStorage.valueToShare = $scope.emailprofile;
        console.log($sessionStorage.valueToShare);
        email = $sessionStorage.valueToShare;

        $scope.initMyProfile();
    }, function errorCallback(response) {
        console.log("errorupdate");
    });
}
$scope.createBooking = function () {

    var user_id = $sessionStorage.valueId;
    console.log(orig_input);
    console.log(dest_input);
    console.log(user_id);
    console.log(total);
    console.log(duration);
    console.log($scope.payment);

    $http({
        method: 'POST',
        url: '/api/booking/create',
        data: {
            'id_user': user_id,
            'from_adress': orig_input,
            'to_adress': dest_input,
            'distance': total,
            'price': total,
            'duration': 123,
            'payment_method': "cash",
            'status': 'pending'
        }
    }).then(function successCallback(response) {


    }, function errorCallback(response) {
        console.log("error");
    });
}






$scope.pret =function () {


    $http({
        method: 'POST',
        url: 'https://api-test.insoftd.com/v1/operator/hubble',
        headers: {'Authorization': 'Basic aW50ZXJuc2hpcEBpbnNvZnRkZXYuY29tOmJhY2tvZmZpY2VAfEAyNDg='},
        data: {
            "name": "direction",
            "startPoint": {
                "lat": orig_lat,
                "lng": orig_long,
                "address": orig_name

            },
            "endPoint": {
                "lat": dest_lat,
                "lng": dest_long,
                "address": dest_name
            },
            "wayPoints": [],
            "app": "backoffice"
        }

    }).then(function (data) {
        $scope.route = data.data.records;

        for (var i in $scope.route) {
            $scope.dista = "Distanta: " + $scope.route[i].details.distance/1000 + " km.";
            $scope.durata = "Timp calatorie: " + $scope.route[i].details.duration / 60 + " minute.";

            $sessionStorage.distance = $scope.route[i].details.distance;
            $sessionStorage.duration = $scope.route[i].details.duration;
            $sessionStorage.passenger = $scope.route[i].details.passenger;
        }
    $http({
            method: 'POST',
            url: 'https://api-test.insoftd.com/v1/operator/price',
            headers: {'Authorization': 'Basic aW50ZXJuc2hpcEBpbnNvZnRkZXYuY29tOmJhY2tvZmZpY2VAfEAyNDg='},
            data: {
                "price_for_all_car_types": 1,
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
                                    "address": orig_name,
                                    "lat": orig_lat,
                                    "lng": orig_long
                                },
                                {
                                    "type": "d",
                                    "address": dest_name,
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
                            "id_client": 4,
                            "pickup_time": "2023-08-29 11:42:00",
                            "passengers_number": 1,
                            "payment_method": "cash",
                            "waiting_time": 0,
                            "voucher_code": null
                        }
                    }
                ]
            }
        }).then(function (data) {

            console.log("merge");
        $scope.pric = "Pret: " + data.data.records.total_price + " $.";
        $sessionStorage.price = data.data.records.total_price;

        });
    });
    }

    $scope.purcase = function () {

        $http({
            method: 'POST',
            url: 'https://api-test.insoftd.com/v1/operator/booking',
            headers: {'Authorization': 'Basic aW50ZXJuc2hpcEBpbnNvZnRkZXYuY29tOmJhY2tvZmZpY2VAfEAyNDg='},
            data:{
                "BookingList": [{
                    "Booking": {
                        "id_car_type":4,
                        "id_client": 1,
                        "order_number": "",
                        "id_driver_to_car": null,
                        "passenger_name": $sessionStorage.name,
                        "passenger_email": $sessionStorage.email,
                        "passenger_mobile": $sessionStorage.phone_number,
                        "payment_method": $scope.payment,
                        "status": "Unallocated",
                        "source": "backoffice",
                        "infant_seats_number": 0,
                        "child_seats_number": 0,
                        "booster_seats_number": 0,
                        "passengers_number": $scope.passenger,
                        "pickup_address": orig_name,
                        "dropoff_address": dest_name,
                        "pickup_time": "2023-8-31 12:11:00",
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
                        "cash": $sessionStorage.price,
                        "credit": 0,
                        "commission": 0,
                        "discount": 0,
                        "driver_tip": 0,
                        "total_journey": $sessionStorage.price,
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
                    "Payment": {
                        "payment_method": $scope.payment,
                        "payment_status": "Pending"
                    }

                }]

            }
        }).then(function (data) {

            alert(data.data.records[0].result);
        });
    }
}]);