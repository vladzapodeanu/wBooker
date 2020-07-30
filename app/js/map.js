function initMap() {
    let map = new google.maps.Map(document.getElementById('map'), {
        mapTypeControl: false,
        center: {
            lat: 46.2167,
            lng: 24.8
        },
        zoom: 6
    });

    new AutocompleteLocation(map);
}

function AutocompleteLocation(map) {
    this.map = map;
    this.originPlaceId = null;
    this.destinationPlaceId = null;
    this.travelMode = 'DRIVING';
    let originInput = document.getElementById('origin-input');
    let destinationInput = document.getElementById('destination-input');
    let modeSelector = document.getElementById('mode-selector');
    this.directionsService = new google.maps.DirectionsService;
    this.directionsDisplay = new google.maps.DirectionsRenderer;
    this.directionsDisplay.setMap(map);

    let originAutocomplete = new google.maps.places.Autocomplete(
        originInput /*, {placeIdOnly: true} */ );
    let destinationAutocomplete = new google.maps.places.Autocomplete(
        destinationInput /*, {placeIdOnly: true} */ );

    this.setupClickListener('changemode-driving', 'DRIVING');

    this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
    this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');

    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(destinationInput);
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(modeSelector);
}

// Sets a listener on a radio button to change the filter type on Places
// Autocomplete.
AutocompleteLocation.prototype.setupClickListener = function (id, mode) {
    let radioButton = document.getElementById(id);
    let me = this;
    radioButton.addEventListener('click', function () {
        me.travelMode = mode;
        me.route();
    });
};

AutocompleteLocation.prototype.setupPlaceChangedListener = function (autocomplete, mode) {
    let me = this;
    autocomplete.bindTo('bounds', this.map);
    autocomplete.addListener('place_changed', function () {
        let place = autocomplete.getPlace();
        if (!place.place_id) {
            window.alert("Please select an option from the dropdown list.");
            return;
        }
        if (mode === 'ORIG') {
            me.originPlaceId = place.place_id;
            document.getElementById("orig_latitude").value = place.geometry.location.lat();
            document.getElementById("orig_longitude").value = place.geometry.location.lng();
        } else {
            me.destinationPlaceId = place.place_id;
            document.getElementById("dest_latitude").value = place.geometry.location.lat();
            document.getElementById("dest_longitude").value = place.geometry.location.lng();
        }
        me.route();
    });

};

AutocompleteLocation.prototype.route = function () {
    if (!this.originPlaceId || !this.destinationPlaceId) {
        return;
    }
    let me = this;

    this.directionsService.route({
        origin: {
            'placeId': this.originPlaceId
        },
        destination: {
            'placeId': this.destinationPlaceId
        },
        travelMode: this.travelMode
    }, function (response, status) {
        if (status === 'OK') {
            me.directionsDisplay.setDirections(response);
            let directionsData = response.routes[0].legs[0];
            let distance = document.getElementById("distance");
            let estimation = document.getElementById("estimation");
            let pret_1 = document.getElementById("pret_1");
            let pret_2 = document.getElementById("pret_2");
            let pret_3 = document.getElementById("pret_3");


            distance.innerHTML = `Distanta dintre  ${directionsData.from_address} si ${directionsData.to_address} este de ${directionsData.distance.text}`;
            estimation.innerHTML = `Timp estimativ: ${directionsData.duration.text}`
            let pretInLei = directionsData.distance.value / 1000 * 1; //1 lei/km
            pret_1.innerHTML = `Pretul cursei pentru masina 1 de masina este de  ${pretInLei} lei.`;
            let pretInLei_2 = directionsData.distance.value / 1000 * 2; //2 lei/km
            pret_2.innerHTML = `Pretul cursei pentru masina 2 de masina este de  ${pretInLei_2} lei.`;
            let pretInLei_3 = directionsData.distance.value / 1000 * 3; //3 lei/km
            pret_3.innerHTML = `Pretul cursei pentru masina 3 de masina este de  ${pretInLei_3} lei.`;
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
};
