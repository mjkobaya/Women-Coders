//Google map custom script
(function($){
"use strict";

	$(document).ready(function() {

		// Google Maps
		// Creating a LatLng object containing the coordinate for the center of the map
		var posLatitude = $('#map').data('position-latitude'),
			posLongitude = $('#map').data('position-longitude'),
			latlng = new google.maps.LatLng(posLatitude,posLongitude);
			/*var mapstyles = [ { "stylers": [ { "invert_lightness": false }, { "weight": 0.5 }, { "hue": "#000000" }, { "visibility": "on" }, { "saturation": 0 }, { "lightness": 0 }, { "gamma": 0.98 } ] } ];*/
			var mapstyles = [ { "stylers": [ { "invert_lightness": false }, { "weight": 0}, { "hue": "black" }, { "visibility": "on" }, { "saturation": -100 }, { "lightness": 5 }, { "gamma": 1 } ] } ];

		// Creating an object literal containing the properties we want to pass to the map
		var options = {
			zoom: 15, // This number can be set to define the initial zoom level of the map
			zoomControl: false,
			disableDoubleClickZoom: true,
			center: latlng,
			mapTypeControlOptions: {  
				mapTypeIds: ['Styled']  
			},
			mapTypeId: 'Styled',
			mapTypeControl: false,
			scaleControl: false,
			streetViewControl: true,
			panControl: true,
			disableDefaultUI: true,
		};
		var map = new google.maps.Map(document.getElementById('map'), options),
			styledMapType = new google.maps.StyledMapType(mapstyles, { name: 'Styled' }),
			markerImage = $('#map').data('marker-img'),
			markerWidth = $('#map').data('marker-width'),
			markerHeight = $('#map').data('marker-height');
		map.mapTypes.set('Styled', styledMapType); 
		// Define Marker properties
		var image = new google.maps.MarkerImage(markerImage,
			// This marker is 64 pixels wide by 58 pixels tall.
			new google.maps.Size(markerWidth, markerHeight),
			new google.maps.Point(0,0),
			new google.maps.Point(18, 18)
		);
		// Add Marker
		var marker1 = new google.maps.Marker({
			position: latlng,
			map: map,
			icon: image
		});
		
	});

})(jQuery);

