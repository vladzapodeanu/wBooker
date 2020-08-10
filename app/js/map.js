var orig_input, dest_input, orig_name, dest_name, orig_lat, orig_long, dest_lat, dest_long, total = 0;

function initAutocomplete() {
    orig_input = new google.maps.places.Autocomplete(
        document.getElementById('from-address'), {types: ['geocode']});

    dest_input = new google.maps.places.Autocomplete(
        document.getElementById('to-address'), {types: ['geocode']});

    orig_input.setFields(['address_component', 'geometry']);
    dest_input.setFields(['address_component', 'geometry']);

    orig_input.addListener('place_changed', fillInAddressPickUp);
    dest_input.addListener('place_changed', fillInAddressDestination);

    initMap();

}

function fillInAddressPickUp() {

    var place = orig_input.getPlace();

    if (place == null) {
        console.log("Adresa pickup null");
    } else {
        orig_lat = place.geometry.location.lat();
        orig_long = place.geometry.location.lng();
        // orig_name = place.address_components[0].long_name + ', ' + place.address_components[1].long_name + ', ' + place.address_components[4].long_name;
    }
}

function fillInAddressDestination() {

    var place = dest_input.getPlace();

    if (place == null) {
        console.log("Adresa destinatie null");
    } else {
        dest_lat = place.geometry.location.lat();
        dest_long = place.geometry.location.lng();
        // dest_name = place.address_components[0].long_name + ', ' + place.address_components[1].long_name + ', ' + place.address_components[4].long_name;
    }
}

function initMap() {
    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer();
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 6,
        center: {lat: 45.943161, lng: 24.96676}
    });
    directionsRenderer.setMap(map);

    var onChangeHandler = function () {
        calculateAndDisplayRoute(directionsService, directionsRenderer);
    };

    document.getElementById('to-address').addEventListener("change", () =>
        setTimeout(onChangeHandler, 300));

}

function calculateAndDisplayRoute(directionsService, directionsRenderer) {
    directionsService.route(
        {
            origin: new google.maps.LatLng(orig_lat, orig_long),
            destination: new google.maps.LatLng(dest_lat, dest_long),
            travelMode: 'DRIVING',
            drivingOptions: {
                departureTime: new Date(Date.now()),
                trafficModel: 'optimistic'
            }
        },
        function (response, status) {
            if (status === 'ZERO_RESULTS') {
                window.alert('Nu exista ruta!');
            } else if (status === 'OK') {
                directionsRenderer.setDirections(response);
                computeTotalDistance(directionsRenderer.getDirections());
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
}

function computeTotalDistance(result) {
    var myroute = result.routes[0];
    for (var i = 0; i < myroute.legs.length; i++) {
        total += myroute.legs[i].distance.value;
    }
   // total = total / 1000;

    // document.getElementById('distance').innerHTML = "Distanta: " + total + "km";
    // document.getElementById('duration').innerHTML = "Timp estimativ: " + myroute.legs[0].duration.text;
    document.getElementById("orig_latitude").innerHTML = "Latitudine Origine: " + orig_lat;
    document.getElementById("orig_longitude").innerHTML = "Longitudine Origine: " + orig_long;
    document.getElementById("dest_latitude").innerHTML = "Latitudine Destinatie: " + dest_lat;
    document.getElementById("dest_longitude").innerHTML = "Longitudine Destinatie: " + dest_long;
    // document.getElementById("price").innerHTML = "Pret: " + total + "Lei";
}