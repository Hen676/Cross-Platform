var map;
var infoWindow;
var service;
var marker;
var markers = [];

var style = {
    hide: [
		{elementType: 'geometry', stylers: [{color: '#242f3e'}]},
		{elementType: 'labels.text.stroke', stylers: [{color: '#222453'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#72366B'}]},
		{elementType: 'labels.icon', stylers: [{visibility: 'off'}]},
        {
            featureType: 'road',
            elementType: 'geometry',
			stylers: [{color: '#38414e'}]
        },
        {
            featureType: 'road',
            elementType: 'labels.text',
            stylers: [{visibility: 'off'}]
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{color: '#4E2B60'}]
        },
        {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{color: '#305067'}]
        },
		{
            featureType: 'water',
            elementType: 'labels.text',
            stylers: [{visibility: 'off'}]
        }
    ]
}

function initMap() {
	// Init map
	var mapOptions = {
		center:new google.maps.LatLng(51.508742,-0.120850),
		zoom:15,
		streetViewControl: false,
		mapTypeControl: false,
		fullscreenControl: false,
		scaleControl: false,
		zoomControl: false,
		styles: style.hide,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	
	map = new google.maps.Map(document.getElementById("googleMap"),mapOptions);
	infoWindow = new google.maps.InfoWindow;
    service = new google.maps.places.PlacesService(map);
	marker = new google.maps.Marker;
	
	// Geolocation centering
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        map.setCenter(pos);
    }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
    });
    } else {
		// Handle browser not supporting error
		handleLocationError(false, infoWindow, map.getCenter());
    }
		
	function handleLocationError(browserHasGeolocation, infoWindow, pos) {
		infoWindow.setPosition(pos);
		infoWindow.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.');
		infoWindow.open(map);
    }
    
	
	
	// Perform a nearby search when idle.
	map.addListener('idle', function() {
		var x = map.getCenter()
		
		var request = {
			type: 'movie_theater',
			location: x,
			radius: 1000,
			fields: ['name', 'geometry', 'formatted_address', 'photos', 'icon']
		}
		
		service.nearbySearch(request, function(results, status) {
			if (status === google.maps.places.PlacesServiceStatus.OK) {
				clearMarkers();
				createMarkers(results, false);
			}
			console.log(status);
		})
    });
}

function createMarkers(places, adjust) {
    var bounds = new google.maps.LatLngBounds();

    for (var i = 0, place; place = places[i]; i++) {
		if (place.icon == "https://maps.gstatic.com/mapfiles/place_api/icons/movies-71.png") {
			var image = {
				url: place.icon,
				size: new google.maps.Size(71, 71),
				origin: new google.maps.Point(0, 0),
				anchor: new google.maps.Point(17, 34),
				scaledSize: new google.maps.Size(25, 25)
			};
			
			var marker = new google.maps.Marker({
				map: map,
				icon: image,
				title: place.name,
				//adress: place.formatted_address,
				//photo: place.photos,
				//url: place.url,
				position: place.geometry.location
			});
			
			markers.push(marker);
		}
    }
		
	google.maps.event.addListener(marker, 'click', function() {
		localStorage.setItem("name",marker.title);
		//localStorage.setItem("adress",marker.adress);
		//localStorage.setItem("photo",marker.photo);
		//localStorage.setItem("url",marker.url);
	
		document.location.href = "Cinema.html";
	});
		
	if (adjust == true)
		map.fitBounds(bounds);
}

function clearMarkers() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap();
    }
}


