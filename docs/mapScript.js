//Desktop Resize
$(window).resize(function(){	
/*
if ($(".navTitle").css("display") != "none" ){
	$('.contain > div').removeClass('row16');
	$('.contain > div').addClass('row8');
}
if ($(".navTitle").css("display") == "none" ){
	$('.contain > div').removeClass('row8');
	$('.contain > div').addClass('row16');
}
*/
});

L.mapbox.accessToken = 'pk.eyJ1IjoiYWxsaXNpbmMtZGV2IiwiYSI6Ik83aDVmRjAifQ.OwuiFwlJneE5opLhw2mWPg';
var map = L.mapbox.map('map', 'allisinc-dev.5bc1003f')
		  .setView([37.781, -122.402], 14);

// Find and store a variable reference to the list of filters.
var filters 	 = document.getElementById('filters');
var featureLayer = map.featureLayer.loadURL('Map.geojson');
var myLayer 	 = map.featureLayer.addTo(map);

// Wait until the marker layer is loaded in order to build a list of possible
// types
map.featureLayer.on('ready', function() {

L.marker([37.7802401874167, -122.40381538867949], {icon: L.divIcon({
	className: 'bld-icon',
	html: '<img src="somaMarker.png"/>',
	iconSize: [20, 20],
    iconAnchor: [25, 20] 
})}).addTo(map);

//adjust mobile map height
/*
if ($(".navTitle").css("display") != "none" ){
 	var bodyHeight 	 = $("body").height();
	var filterHeight = $(".filter-ui").outerHeight();
	var mapWrap = $("#mapWrap").outerHeight();
}
*/

//add zoom controls
/*
if($('filter-ui').css('position', 'absolute')) {
	
}
*/

myLayer.on('layeradd', function(e) {
    var marker = e.layer;
    var feature = marker.feature;
    // Create custom popup content
	var content =  
	'<div class="inner">'+
	'<div class="content">'+
    '<img src="https:\/\/tychoblender.github.io/mapbox/img/'+ 	
    feature.properties.image + '" alt=\"popup label image\" \/>' +
    '<\/div>' +
    '<\/div>' +
    '<div class="text">' +
    '<p class="type">'+ feature.properties.type + '<\/p>' +
    '<p class="boldIt">' + feature.properties.title + '<\/p>' +
    '<p class="address">'+ feature.properties.description + '<\/p>'+
	'<\/div>';
	
	marker.bindPopup(content);	
	marker.setIcon(L.divIcon({className: 'count-icon',iconSize: [15, 15]}));	
});

// Collect the types of symbols in this layer. 
var typesObj = {}, types = [];
typesObj['View All'] = true;

var features = map.featureLayer.getGeoJSON().features;

for (var i = 0; i < features.length; i++) {
	typesObj[features[i].properties['type']] = true;
}

for (var k in typesObj) {
	types.push(k);
};

var checkboxes = [];
// Create a filter interface.
for (var i = 0; i < types.length; i++) {

	var item = filters.appendChild(document.createElement('div'));
	var checkbox = item.appendChild(document.createElement('input'));
	var label = item.appendChild(document.createElement('label'));
	checkbox.type = 'radio';
	checkbox.id = types[i];
	checkbox.checked = false;
	label.innerHTML = types[i];
	label.setAttribute('class', 'checkbox');
	checkbox.setAttribute('name', 'group');
	label.setAttribute('for', types[i]);
	checkbox.addEventListener('click', update);
	checkboxes.push(checkbox);
}

// Initial Load HIDES markers
map.featureLayer.setFilter(function(f) {
	return true;
});

//init View All as CHECKED && .active
checkboxes[0].checked = true;
//console.log(document.getElementBytId('View All'));

//selecting a marker, center the map on its coordinates.
map.featureLayer.on('click', function(e) {
    map.panTo(e.layer.getLatLng());    
    var markerTitle = e.layer.feature.properties.title; 
	ga('send', 'event', 'navigation', 'click', 'marker select', markerTitle);    
});


map.on('click', function(e) {
	var value = e.latlng.lat;
	var value = e.latlng.lat + ", " + e.latlng.lng;
	console.log(value);
	ga('send', 'event', 'navigation', 'click', 'map layer', value);
});
// This function is called whenever someone clicks on a checkbox and changes
// the selection of markers to be displayed.
function update() {
	var enabled = {};
	var enabledActive;//ref the id the LATEST enabled Layer
	
	// Run through each checkbox and record whether it is checked. If it is,
	// add it to the object of types to display, otherwise do not.
	for (var i = 0; i < checkboxes.length; i++) {
		if (checkboxes[i].checked){
			enabled[checkboxes[i].id] = true;
			var enabledActive = checkboxes[i].id;
		}
	}
				
	if(enabled['View All']){
		map.featureLayer.setFilter(function(f) {
	    	return true;
		});
	}else{
	map.featureLayer.setFilter(function(feature) {
		return (feature.properties['type'] in enabled);
	});
	}
}
});

