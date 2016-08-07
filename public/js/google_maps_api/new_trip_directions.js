function initMap() {
  var map = new google.maps.Map(document.getElementById('jon_map'), {
    zoom: 11
  });
  var infoWindow = new google.maps.InfoWindow({map: map});
  // Try HTML5 geolocation.
  var trafficLayer = new google.maps.TrafficLayer();
  var transitLayer = new google.maps.TransitLayer();
  var bikeLayer = new google.maps.BicyclingLayer();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };


      trafficLayer.setMap(null);
      transitLayer.setMap(null);
      bikeLayer.setMap(null);
      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');

      $('#showTraffic').click(function() {
        trafficLayer.getMap() == null ? trafficLayer.setMap(map) : trafficLayer.setMap(null);
      })

      $('#showTransit').click(function() {
        transitLayer.getMap() == null ? transitLayer.setMap(map) : transitLayer.setMap(null);
      })

      $('#showBike').click(function() {
        bikeLayer.getMap() == null ? bikeLayer.setMap(map) : bikeLayer.setMap(null);
      })

      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}


function initMap() {
       var origin_place_id = -33.8688;
       var destination_place_id = 151.2195;
       //map layers
       var trafficLayer = new google.maps.TrafficLayer();
       var transitLayer = new google.maps.TransitLayer();
       var bikeLayer = new google.maps.BicyclingLayer();

       var travel_mode = 'WALKING';

       var travel_mode = 'DRIVING';
       // Add Adjustment to hit the select box
       var map = new google.maps.Map(document.getElementById('jon_map'), {
         mapTypeControl: false,
         center: {lat: 39.7392, lng: -104.9903},
         zoom: 13
       });
       var directionsService = new google.maps.DirectionsService;
       var directionsDisplay = new google.maps.DirectionsRenderer;
       directionsDisplay.setMap(map);
       trafficLayer.setMap(null);
       transitLayer.setMap(null);
       bikeLayer.setMap(null);

       $('#showTraffic').click(function() {
         trafficLayer.getMap() == null ? trafficLayer.setMap(map) : trafficLayer.setMap(null);
       })

       $('#showTransit').click(function() {
         transitLayer.getMap() == null ? transitLayer.setMap(map) : transitLayer.setMap(null);
       })

       $('#showBike').click(function() {
         bikeLayer.getMap() == null ? bikeLayer.setMap(map) : bikeLayer.setMap(null);
       })

       
       var origin_input = document.getElementById('origin-input');
       var destination_input = document.getElementById('destination-input');
       var modes = document.getElementById('mode');

      //  map.controls[google.maps.ControlPosition.TOP_LEFT].push(origin_input);
      //  map.controls[google.maps.ControlPosition.TOP_LEFT].push(destination_input);
      //  map.controls[google.maps.ControlPosition.TOP_LEFT].push(modes);

       var origin_autocomplete = new google.maps.places.Autocomplete(origin_input);
       origin_autocomplete.bindTo('bounds', map);
       var destination_autocomplete =
           new google.maps.places.Autocomplete(destination_input);
       destination_autocomplete.bindTo('bounds', map);

       // Sets a listener on a radio button to change the filter type on Places.  Not yet functioning.  Defaulted to Driving
      //  Autocomplete.
      // function setupClickListener(id, mode) {
      //    var select = document.getElementById(id);
      //    select.addEventListener('click', function() {
      //      console.log(mode);
      //      travel_mode = mode;
      //    });
      //  }
      //  setupClickListener('changemode-walking', 'WALKING');
      //  setupClickListener('changemode-transit', 'TRANSIT');
      //  setupClickListener('changemode-driving', 'DRIVING');
      //  setupClickListener('changemode-bicycling', 'BICYCLING');

       var select = document.getElementById('mode')
       var selectedMode = select.options[select.selectedIndex].value;

       function expandViewportToFitPlace(map, place) {
         if (place.geometry.viewport) {
           map.fitBounds(place.geometry.viewport);
         } else {
           map.setCenter(place.geometry.location);
           map.setZoom(17);
         }
       }

       origin_autocomplete.addListener('place_changed', function() {
         var place = origin_autocomplete.getPlace();
         if (!place.geometry) {
           window.alert("Autocomplete's returned place contains no geometry");
           return;
         }
         expandViewportToFitPlace(map, place);

         // If the place has a geometry, store its place ID and route if we have
         // the other place ID
         origin_place_id = place.place_id;
         route(origin_place_id, destination_place_id, travel_mode,
               directionsService, directionsDisplay);
       });

       destination_autocomplete.addListener('place_changed', function() {
         var place = destination_autocomplete.getPlace();
         if (!place.geometry) {
           window.alert("Autocomplete's returned place contains no geometry");
           return;
         }
         expandViewportToFitPlace(map, place);

         // If the place has a geometry, store its place ID and route if we have
         // the other place ID
         destination_place_id = place.place_id;
         route(origin_place_id, destination_place_id, travel_mode,
               directionsService, directionsDisplay);
       });

       function route(origin_place_id, destination_place_id, travel_mode,
                      directionsService, directionsDisplay) {
         if (!origin_place_id || !destination_place_id) {
           return;
         }
         directionsService.route({
           origin: {'placeId': origin_place_id},
           destination: {'placeId': destination_place_id},
           travelMode: travel_mode
         }, function(response, status) {
           if (status === 'OK') {
             directionsDisplay.setDirections(response);
           } else {
             window.alert('Directions request failed due to ' + status);
           }
         });
       }
     }
