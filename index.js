//asks for users location




var map, infoWindow;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 39.5501,
      lng: -105.7821
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
      map.setZoom(12);
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
          console.log(typeof response.data.Items[i].taskId);
          return function() {
            infoWindow.setContent('<h3>'+ response.data.Items[i].type +'</h3>'
            +'<p>'+ response.data.Items[i].desc +'</p>'
            +'<a class="btn btn-primary" href="complete.html?t='+ parseInt(response.data.Items[i].taskId) +'&desc='+ response.data.Items[i].desc +'&type='+ response.data.Items[i].type +'&loc='+ response.data.Items[i].location +'&stat='+ response.data.Items[i].status +'" role="button">Claim This Task</a>');
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
