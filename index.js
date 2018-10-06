//asks for users location




var map, infoWindow;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: -34.397,
      lng: 150.644
    },
    zoom: 6
  });

  infoWindow = new google.maps.InfoWindow

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      //once location is found, display loaction marker
      var marker = new google.maps.Marker({
        position: pos,
        map: map,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 5
        }
      });
      map.setCenter(pos);
      map.setZoom(13);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
  axios.get('https://tzmg73n7eh.execute-api.us-east-2.amazonaws.com/dev/tasks')
    .then(function(response) {


      // handle success
      console.log(response.data.Items);

      var marker, i;

      for (i = 0; i < response.data.Items.length; i++) {
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(response.data.Items[i].lat, response.data.Items[i].lng),
          map: map
        });

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
          return function() {
            infoWindow.setContent(response.data.Items[i].desc);
            infoWindow.open(map, marker);
          }
        })(marker, i));
      }
    })
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}
