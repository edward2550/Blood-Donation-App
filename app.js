let map;
let service;
let infowindow;

var locationForm = document.getElementById('location-form');

locationForm.addEventListener('submit',geocode)


function geocode(e){
    //prevent actual submit
    e.preventDefault();

    var location = document.getElementById('location-input').value;
    axios.get('https://maps.googleapis.com/maps/api/geocode/json?', {
        params:{
            address:location,
            key:'AIzaSyDri_ocaq6Gbsjd7jbcSldou9hX84L6Cyc'
        }
    })
    .then(function(response){
        //log full response
        console.log(response)

    //     //formate address
       var formattedLa = response.data.results[0].geometry.location.lat;
       var formattedLon = response.data.results[0].geometry.location.lng;
       console.log(formattedLa)
       console.log(formattedLon)
    // 

    searchForHospitals(formattedLa,formattedLon)
    })
    .catch(function(error){
        console.log(error)
    })    
}


function initMap() {
    const initialLocation = new google.maps.LatLng(-33.867, 151.195); // Sydney, Aus
  
    infowindow = new google.maps.InfoWindow();
    map = new google.maps.Map(document.getElementById("map"), {
      center: initialLocation,
      zoom: 15,
    });
  }
  
  function createMarker(place) {
    if (!place.geometry || !place.geometry.location) return;
  
    const marker = new google.maps.Marker({
      map,
      position: place.geometry.location,
    });
  
    google.maps.event.addListener(marker, "click", () => {
      infowindow.setContent(place.name || "");
      infowindow.open(map);
    });
  }
  
  function searchForHospitals(lat, long) {
    var location = new google.maps.LatLng(lat,long);
  
    map = new google.maps.Map(document.getElementById('map'), {
        center: location,
        zoom: 15
      });
  
    var request = {
      location: location,
      radius: '1000',
      type: ['hospital']
      //add fields maybe 
    };
  
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, function(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
        //play around for dif marker
      }
      map.setCenter(results[0].geometry.location);
    }});
  }
  
  window.initMap = initMap;
  
  