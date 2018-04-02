var types  = ['All', 'Transformations','Sustainability', 'Land Restoration','Community Builder'];

L.mapbox.accessToken = 'pk.eyJ1IjoiYWxsaXNpbmMtZGV2IiwiYSI6Ik83aDVmRjAifQ.OwuiFwlJneE5opLhw2mWPg';
var map = L.mapbox.map('map', 'allisinc-dev.39427880', { zoomControl: false })
    .setView([37.878, -122.277], 10);
    
new L.Control.Zoom({ position: 'topright' }).addTo(map);
map.scrollWheelZoom.disable();

//var featureLayer 	 = L.mapbox.featureLayer().loadURL('sdg.geojson');
var fullFeatureLayer = map.featureLayer.loadURL('sdg.geojson');

fullFeatureLayer.setFilter(function(f) {
	return false;
});


var traArray 	 = [],susArray = [],lndArray = [],comArray = [];   
var types	     =[];
var filters 	 = document.getElementById('filters');
var filterBox    = false;

var typesObj = {}
typesObj['All'] = true;

// The clusterGroup gets each marker in the group added to it
// once loaded, and then is added to the map    
var clusterGroup  = L.markerClusterGroup({ 
showCoverageOnHover : false,
maxClusterRadius:110,
iconCreateFunction: function (cluster) {
    var childCount = cluster.getChildCount();
    var c = ' marker-cluster-';
    if (childCount < 3) {
        c += 'small';
    } else if (childCount < 6) {
        c += 'medium';
    } else {
        c += 'large';
    }
    
    return new L.DivIcon({ 
    	html: '<div><span><b>' + childCount + '</b></span></div>', 
    	className: 'marker-cluster' + c, 
    	iconSize: new L.Point(134, 134) 
    });
}

});		  
var clusterGroupA = L.markerClusterGroup({ 
	showCoverageOnHover : false,
	maxClusterRadius:110,
	iconCreateFunction: function (cluster) {
	    var childCount = cluster.getChildCount();
	    var c = ' marker-cluster-';
	    if (childCount < 3) {
	        c += 'small';
	    } else if (childCount < 6) {
	        c += 'medium';
	    } else {
	        c += 'large';
	    }
	    
	    return new L.DivIcon({ 
	    	html: '<div><span><b>' + childCount + '</b></span></div>', 
	    	className: 'marker-cluster' + c, 
	    	iconSize: new L.Point(134, 134) 
	    });
	}
});
var clusterGroupB = L.markerClusterGroup({ 
	showCoverageOnHover : false,
	maxClusterRadius:110,
	iconCreateFunction: function (cluster) {
	    var childCount = cluster.getChildCount();
	    var c = ' marker-cluster-';
	    if (childCount < 3) {
	        c += 'small';
	    } else if (childCount < 6) {
	        c += 'medium';
	    } else {
	        c += 'large';
	    }
	    
	    return new L.DivIcon({ 
	    	html: '<div><span><b>' + childCount + '</b></span></div>', 
	    	className: 'marker-cluster' + c, 
	    	iconSize: new L.Point(134, 134) 
	    });
	}
});
var clusterGroupC = L.markerClusterGroup({ 
	showCoverageOnHover : false,
	maxClusterRadius:110,
	iconCreateFunction: function (cluster) {
	    var childCount = cluster.getChildCount();
	    var c = ' marker-cluster-';
	    if (childCount < 3) {
	        c += 'small';
	    } else if (childCount < 6) {
	        c += 'medium';
	    } else {
	        c += 'large';
	    }
	    
	    return new L.DivIcon({ 
	    	html: '<div><span><b>' + childCount + '</b></span></div>', 
	    	className: 'marker-cluster' + c, 
	    	iconSize: new L.Point(134, 134) 
	    });
	}
});
var clusterGroupD = L.markerClusterGroup({ 
	showCoverageOnHover : false,
	maxClusterRadius:110,
	iconCreateFunction: function (cluster) {
	    var childCount = cluster.getChildCount();
	    var c = ' marker-cluster-';
	    if (childCount < 3) {
	        c += 'small';
	    } else if (childCount < 6) {
	        c += 'medium';
	    } else {
	        c += 'large';
	    }
	    
	    return new L.DivIcon({ 
	    	html: '<div><span><b>' + childCount + '</b></span></div>', 
	    	className: 'marker-cluster' + c, 
	    	iconSize: new L.Point(134, 134) 
	    });
	}
});

fullFeatureLayer.on('ready', function(e) {    

    var typesObj = {}, types = ['All', 'Transformations','Sustainability', 'Land Resotration','Community Builder'],traArray = [],susArray = [],lndArray = [],comArray = [];   

	for (var k in typesObj) types.push(k);
	
	for(var i = 0; i < fullFeatureLayer._geojson.features.length; i++){
		var sdgJSON 	= fullFeatureLayer._geojson.features[i];
		var title 		= sdgJSON.properties['title'];
		var description = sdgJSON.properties['description'];
		var str = title;
		var href = str.split(' ').join('-').toLowerCase();
		var url = "dev.allisinc.com/sdgMap/img/mapThumbs/";//swap for staging or prod
		
		var mapThumb = "http://"+url+""+href+"_thumb.jpg";
		
		//console.log(mapThumb);
		
		var content = 
        	'<a href="/development/'+ href +'">' + 
        	'<div class="inner">'+
        	'<div class="imgWrap" style="background: url('+mapThumb+') no-repeat;"><\/div>'+
			'<div class="text">' +
			'<p class="description">' + description + '<\/p>' +
			'<p class="title">'+ title + '<\/p>'+
			'<\/div>'+
			
			'<div id="navnext">' +
			'<\/div>'+
			'<\/div>'+
			'<\/a>';	
		
		var marker = L.marker(new L.LatLng(sdgJSON.geometry.coordinates[1], sdgJSON.geometry.coordinates[0]), {icon: L.divIcon({className: 'count-icon',iconSize: [23, 23]})
    });	
       
		marker.bindPopup(content);	
		
		clusterGroup.addLayer(marker);
		
		//Sort markers into Layers
		if('Transformations' in fullFeatureLayer._geojson.features[i].properties){
			
			var title 		= sdgJSON.properties['title'];
			var description = sdgJSON.properties['description'];
			var str = title;
			var href = str.split(' ').join('-').toLowerCase();
			var mapThumb = href+'_thumb.jpg';
			
			var content = 
			'<a href="/development/'+ href +'">' + 
			'<div class="inner">'+
			'<div class="imgWrap">'+
			'<img src=\"http:\/\/dev.allisinc.com\/sdgMap\/img\/mapThumbs\/'+ mapThumb +'\" alt=\"popup label image\" height=\"68\" width=\"68\" \/>' +
			'<\/div>'+
			'<div class="text">' +
			'<p class="description">' + description + '<\/p>' +
			'<p class="title">'+ title + '<\/p>'+
			'<\/div>'+
			
			'<div id="navnext">' +
			'<\/div>'+
			'<\/div>'+
			'<\/a>';
			
			var marker = L.marker(new L.LatLng(sdgJSON.geometry.coordinates[1], sdgJSON.geometry.coordinates[0]), {icon: L.divIcon({className: 'count-icon',iconSize: [23, 23]})
			});	
			
			marker.bindPopup(content);	
			
			clusterGroupA.addLayer(marker);
		}	
	
		if('Sustainability' in fullFeatureLayer._geojson.features[i].properties){
			
			var title 		= sdgJSON.properties['title'];
			var description = sdgJSON.properties['description'];
			var str = title;
			var href = str.split(' ').join('-').toLowerCase();
			var mapThumb = href+'_thumb.jpg';
			
			var content = 
			'<a href="/development/'+ href +'">' + 
			'<div class="inner">'+
			'<div class="imgWrap">'+
			'<img src=\"http:\/\/dev.allisinc.com\/sdgMap\/img\/mapThumbs\/'+ mapThumb +'\" alt=\"popup label image\" height=\"68\" width=\"68\" \/>' +
			'<\/div>'+
			'<div class="text">' +
			'<p class="description">' + description + '<\/p>' +
			'<p class="title">'+ title + '<\/p>'+
			'<\/div>'+
			
			'<div id="navnext">' +
			'<\/div>'+
			'<\/div>'+
			'<\/a>';
			
			var marker = L.marker(new L.LatLng(sdgJSON.geometry.coordinates[1], sdgJSON.geometry.coordinates[0]), {icon: L.divIcon({className: 'count-icon',iconSize: [23, 23]})
			});	
			
			marker.bindPopup(content);	
			
			clusterGroupB.addLayer(marker);
			}	
		
		if('Urban Remediation' in fullFeatureLayer._geojson.features[i].properties){
			
			var title 		= sdgJSON.properties['title'];
			var description = sdgJSON.properties['description'];
			var str = title;
			var href = str.split(' ').join('-').toLowerCase();
			var mapThumb = href+'_thumb.jpg';
			
			var content = 
			'<a href="/development/'+ href +'">' + 
			'<div class="inner">'+
			'<div class="imgWrap">'+
			'<img src=\"http:\/\/dev.allisinc.com\/sdgMap\/img\/mapThumbs\/'+ mapThumb +'\" alt=\"popup label image\" height=\"68\" width=\"68\" \/>' +
			'<\/div>'+
			'<div class="text">' +
			'<p class="description">' + description + '<\/p>' +
			'<p class="title">'+ title + '<\/p>'+
			'<\/div>'+
			
			'<div id="navnext">' +
			'<\/div>'+
			'<\/div>'+
			'<\/a>';
			
			var marker = L.marker(new L.LatLng(sdgJSON.geometry.coordinates[1], sdgJSON.geometry.coordinates[0]), {icon: L.divIcon({className: 'count-icon',iconSize: [23, 23]})
			});	
			
			marker.bindPopup(content);	
			clusterGroupC.addLayer(marker);
			}
	
		if('Community Builder' in fullFeatureLayer._geojson.features[i].properties){
			var title 		= sdgJSON.properties['title'];
			var description = sdgJSON.properties['description'];
			var str = title;
			var href = str.split(' ').join('-').toLowerCase();
			var mapThumb = href+'_thumb.jpg';
			
			var content = 
			'<a href="/development/'+ href +'">' + 
			'<div class="inner">'+
			'<div class="imgWrap">'+
			'<img src=\"http:\/\/dev.allisinc.com\/sdgMap\/img\/mapThumbs\/'+ mapThumb +'\" alt=\"popup label image\" height=\"68\" width=\"68\" \/>' +
			'<\/div>'+
			'<div class="text">' +
			'<p class="description">' + description + '<\/p>' +
			'<p class="title">'+ title + '<\/p>'+
			'<\/div>'+
			
			'<div id="navnext">' +
			'<\/div>'+
			'<\/div>'+
			'<\/a>';
			
			var marker = L.marker(new L.LatLng(sdgJSON.geometry.coordinates[1], sdgJSON.geometry.coordinates[0]), {icon: L.divIcon({className: 'count-icon',iconSize: [23, 23]})
			});	
			
			marker.bindPopup(content);				
			clusterGroupD.addLayer(marker);
			}	
	}
	
	map.addLayer(clusterGroup);	

fullFeatureLayer.on('click', function(e) {
	console.log('CLICKED!');
    var centerMarker = e.layer.getLatLng()
    console.log(centerMarker);
    map.panTo(centerMarker);
});

});

var all      = document.getElementById('filter-all'),
	tra      = document.getElementById('filter-transformations'),
	sus      = document.getElementById('filter-sustainability'),
	lnd      = document.getElementById('filter-landRestoration'),
	com      = document.getElementById('filter-communityBuilder'),
	closeBtn = document.getElementById('filter-box-close'),
	mapArea  = document.getElementById('map');

//Toggle setFilter
tra.onclick = function(e) {
	all.className = '';
	sus.className = '';
	lnd.className = '';
	com.className = '';
	this.className = 'active';
	
	$('.leaflet-container').find('.leaflet-marker-icon').fadeOut('fast');
	$('.leaflet-container').find('.leaflet-marker-icon > div').fadeOut('fast');
	
	setTimeout(function(){
		map.removeLayer(clusterGroup);
		map.removeLayer(clusterGroupB);
		map.removeLayer(clusterGroupC);
		map.removeLayer(clusterGroupD);
	},300);
	
	
	setTimeout(function(){
		map.addLayer(clusterGroupA);
		map.fitBounds(clusterGroupA.getBounds());	
		$('.leaflet-container').find('.leaflet-marker-icon').toggle();
		$('.leaflet-container').find('.leaflet-marker-icon > div').toggle();
		
	},600);
	
	setTimeout(function(){
		$('.leaflet-container').find('.leaflet-marker-icon').fadeIn();
		$('.leaflet-container').find('.leaflet-marker-icon > div').fadeIn();
	},650);
	
	return false;
};

sus.onclick = function(e) {
	all.className = '';
	tra.className = '';
	lnd.className = '';
	com.className = '';
	this.className = 'active';
		$('.leaflet-container').find('.leaflet-marker-icon').fadeOut('fast');
	$('.leaflet-container').find('.leaflet-marker-icon > div').fadeOut('fast');
	
	setTimeout(function(){
		map.removeLayer(clusterGroup);
		map.removeLayer(clusterGroupA);
		map.removeLayer(clusterGroupC);
		map.removeLayer(clusterGroupD);
	},300);
	
	
	setTimeout(function(){
		map.addLayer(clusterGroupB);	
		map.fitBounds(clusterGroupB.getBounds());	
		$('.leaflet-container').find('.leaflet-marker-icon').toggle();
		$('.leaflet-container').find('.leaflet-marker-icon > div').toggle();
		
	},600);
	
	setTimeout(function(){
		$('.leaflet-container').find('.leaflet-marker-icon').fadeIn();
		$('.leaflet-container').find('.leaflet-marker-icon > div').fadeIn();
	},650);
	
	return false;
};

lnd.onclick = function(e) {
	all.className = '';
	tra.className = '';
	sus.className = '';
	com.className = '';
	this.className = 'active';
	
	$('.leaflet-container').find('.leaflet-marker-icon').fadeOut('fast');
	$('.leaflet-container').find('.leaflet-marker-icon > div').fadeOut('fast');
	
	setTimeout(function(){
		map.removeLayer(clusterGroup);
		map.removeLayer(clusterGroupA);
		map.removeLayer(clusterGroupB);
		map.removeLayer(clusterGroupD);
	},300);
	
	
	setTimeout(function(){
		map.addLayer(clusterGroupC);	
		map.fitBounds(clusterGroupC.getBounds());	
		$('.leaflet-container').find('.leaflet-marker-icon').toggle();
		$('.leaflet-container').find('.leaflet-marker-icon > div').toggle();
		
	},600);
	
	setTimeout(function(){
		$('.leaflet-container').find('.leaflet-marker-icon').fadeIn();
		$('.leaflet-container').find('.leaflet-marker-icon > div').fadeIn();
	},650);
	
	return false;
};

com.onclick = function(e) {
	all.className = '';
	tra.className = '';
	sus.className = '';
	lnd.className = '';
	this.className = 'active';
	
	$('.leaflet-container').find('.leaflet-marker-icon').fadeOut('fast');
	$('.leaflet-container').find('.leaflet-marker-icon > div').fadeOut('fast');
	
	setTimeout(function(){
		map.removeLayer(clusterGroup);
		map.removeLayer(clusterGroupA);
		map.removeLayer(clusterGroupB);
		map.removeLayer(clusterGroupC);
	},300);
	
	
	setTimeout(function(){
		map.addLayer(clusterGroupD);
		map.fitBounds(clusterGroupD.getBounds());		
		$('.leaflet-container').find('.leaflet-marker-icon').toggle();
		$('.leaflet-container').find('.leaflet-marker-icon > div').toggle();
		
	},600);
	
	setTimeout(function(){
		$('.leaflet-container').find('.leaflet-marker-icon').fadeIn();
		$('.leaflet-container').find('.leaflet-marker-icon > div').fadeIn();
	},650);
	return false;
};

all.onclick = function() {
	tra.className = '';
	sus.className = '';
	lnd.className = '';
	com.className = '';
	this.className = 'active';
	
	$('.leaflet-container').find('.leaflet-marker-icon').fadeOut('fast');
	$('.leaflet-container').find('.leaflet-marker-icon > div').fadeOut('fast');
	
	setTimeout(function(){
		map.removeLayer(clusterGroupA);
		map.removeLayer(clusterGroupB);
		map.removeLayer(clusterGroupC);
		map.removeLayer(clusterGroupD);
	},300);
	
	
	setTimeout(function(){
		map.addLayer(clusterGroup);	
		map.fitBounds(clusterGroup.getBounds());	
		$('.leaflet-container').find('.leaflet-marker-icon').toggle();
		$('.leaflet-container').find('.leaflet-marker-icon > div').toggle();
		
	},600);
	
	setTimeout(function(){
		$('.leaflet-container').find('.leaflet-marker-icon').fadeIn();
		$('.leaflet-container').find('.leaflet-marker-icon > div').fadeIn();
	},650);
	
	return false;
};

closeBtn.onclick = function() {
	$('#filter-box').fadeOut('fast');
	return filterBox = false;	
};

mapArea.onclick = function() {
	if(filterBox){
		$('#filter-box').fadeOut('fast');
		return filterBox = false;	
	}
	
	setTimeout(function(){
		$('#filter-box-content').fadeOut('fast');
		return filterBox = false;			
	},300);
};


$(tra).mouseover(function() {
	if(filterBox){
		$('#filter-box-content').fadeOut('fast');
		
		setTimeout(function(){
			$('#filter-box-icon').removeClass();
			$('#filter-box-icon').addClass('transformations'); 
			$('#filter-box-title').html('Transformations'); 
			$('#filter-box-summary').html('Tristique sed est. Mauris ac libero et sem. Elementum et feugiat id, Etiam id iaculis elit. Sed lectus neque, '); 
			$('#filter-box-link').removeClass();
			$('#filter-box-link').addClass('transformations'); 
			$('#filter-box-link a').attr('href', 'http://www.google.com/');
			$('#filter-box-link a').html('more on transformations');
		},500);
		
		//replaceContent
		setTimeout(function(){
			$('#filter-box-content').fadeIn('fast');
			return filterBox = true;			
		},800);	  	  
	}
	
	setTimeout(function(){
	$('#filter-box-icon').removeClass();
	$('#filter-box-icon').addClass('transformations'); 
	$('#filter-box-title').html('Transformations'); 
	$('#filter-box-summary').html('Tristique sed est. Mauris ac libero et sem. Elementum et feugiat id, Etiam id iaculis elit. Sed lectus neque, '); 
	$('#filter-box-link').removeClass();
	$('#filter-box-link').addClass('transformations'); 
	$('#filter-box-link a').attr('href', 'http://www.google.com/');
	$('#filter-box-link a').html('more on transformations');

	//FadeIn
	$('#filter-box-content').fadeIn('fast');	
	$('#filter-box').fadeIn('fast');	
	return filterBox = true;	
	},300);
});

$(sus).mouseover(function() {
    if(filterBox){
	  	$('#filter-box-content').fadeOut('fast');	
	  	
	  	setTimeout(function(){
		  	$('#filter-box-icon').removeClass();
			$('#filter-box-icon').addClass('sustainability'); 
			$('#filter-box-title').html('Sustainability'); 
			$('#filter-box-summary').html('Etiam id iaculis elit. Sed lectus neque, elementum et feugiat id, tristique sed est. Mauris ac libero et sem.'); 	
			$('#filter-box-link').removeClass();
			$('#filter-box-link').addClass('sustainability'); 
			$('#filter-box-link a').attr('href', 'http://redone.org/_sites/sdg/expertise/sustainability/');
			$('#filter-box-link a').html('more on Sustainability');
		},500);
		
		setTimeout(function(){
			$('#filter-box-content').fadeIn('fast');
			return filterBox = true;
		},800);	
	}
	
	//replaceContent!
	setTimeout(function(){
	$('#filter-box-icon').removeClass();
	$('#filter-box-icon').addClass('sustainability'); 
	$('#filter-box-title').html('Sustainability'); 
	$('#filter-box-summary').html('Etiam id iaculis elit. Sed lectus neque, elementum et feugiat id, tristique sed est. Mauris ac libero et sem.'); 	
	$('#filter-box-link').removeClass();
	$('#filter-box-link').addClass('sustainability'); 
	$('#filter-box-link a').attr('href', 'http://redone.org/_sites/sdg/expertise/sustainability/');
	$('#filter-box-link a').html('more on Sustainability');

	//FadeIn
	$('#filter-box-content').fadeIn('fast');	
	$('#filter-box').fadeIn('fast');	
	return filterBox = true;
	},300);

});

$(lnd).mouseover(function() {
    if(filterBox){    	
	  	$('#filter-box-content').fadeOut('fast');	
	  	
	  	setTimeout(function(){
		  	$('#filter-box-icon').removeClass();
			$('#filter-box-icon').addClass('landRestoration'); 
			$('#filter-box-title').html('Land Restoration'); 
			$('#filter-box-summary').html('Sed lectus neque, elementum et feugiat id. Mauris ac tristique sed est libero et libero sem.'); 	
			$('#filter-box-link').removeClass();
			$('#filter-box-link').addClass('landRestoration'); 
			$('#filter-box-link a').attr('href', 'http://redone.org/_sites/sdg/expertise/land-restoration/');
			$('#filter-box-link a').html('more on Land Restoration');
		},500);
		
		setTimeout(function(){
			$('#filter-box-content').fadeIn('fast');
			return filterBox = true;
		},800);	
	}
	
	//replaceContent!
	setTimeout(function(){
	$('#filter-box-icon').removeClass();
	$('#filter-box-icon').addClass('landRestoration'); 
	$('#filter-box-title').html('Land Restoration'); 
	$('#filter-box-summary').html('Sed lectus neque, elementum et feugiat id. Mauris ac tristique sed est libero et libero sem.'); 	
	$('#filter-box-link').removeClass();
	$('#filter-box-link').addClass('landRestoration'); 
	$('#filter-box-link a').attr('href', 'http://redone.org/_sites/sdg/expertise/land-restoration/');
	$('#filter-box-link a').html('more on Land Restoration');

	//FadeIn
	$('#filter-box-content').fadeIn('fast');	
	$('#filter-box').fadeIn('fast');	
	return filterBox = true;
	},300);

});

$(com).mouseover(function() {
    if(filterBox){
	  	$('#filter-box-content').fadeOut('fast');	
	  	
	  	setTimeout(function(){
		  	$('#filter-box-icon').removeClass();
			$('#filter-box-icon').addClass('comBuilder'); 
			$('#filter-box-title').html('Community Builder'); 
			$('#filter-box-summary').html('Sed lectus neque, elementum et feugiat id. Mauris ac tristique sed est libero et libero sem.'); 	
			$('#filter-box-link').removeClass();
			$('#filter-box-link').addClass('comBuilder'); 
			$('#filter-box-link a').attr('href', 'http://redone.org/_sites/sdg/expertise/land-restoration/');
			$('#filter-box-link a').html('more on Building Communities');
		},500);
		
		setTimeout(function(){
			$('#filter-box-content').fadeIn('fast');
			return filterBox = true;
		},800);	
	}
	
	//replaceContent!
	setTimeout(function(){
	$('#filter-box-icon').removeClass();
	$('#filter-box-icon').addClass('comBuilder'); 
	$('#filter-box-title').html('Community Builder'); 
	$('#filter-box-summary').html('Sed lectus neque, elementum et feugiat id. Mauris ac tristique sed est libero et libero sem.'); 	
	$('#filter-box-link').removeClass();
	$('#filter-box-link').addClass('comBuilder'); 
	$('#filter-box-link a').attr('href', 'http://redone.org/_sites/sdg/expertise/community-builder/');
	$('#filter-box-link a').html('more on Building Communities');

	$('#filter-box-content').fadeIn('fast');	
	$('#filter-box').fadeIn('fast');	
	return filterBox = true;
	},300);

});

$(all).mouseover(function() {
	$('#filter-box').fadeOut('fast');	
	return filterBox = false;
});


$(".filter-ui.mobile #grid-filter-menu").hide();	

$(".filter-ui.mobile #grid-filter-mobile-drop").click(function(){
	$("#grid-filter-menu").slideToggle(400);
});	


$(".grid-filter-button").click(function(e){
e.preventDefault();
var currArea = $(this).attr("id");

if(currArea == 'filter-all'){
	map.removeLayer(clusterGroupA);
	map.removeLayer(clusterGroupB);
	map.removeLayer(clusterGroupC);
	map.removeLayer(clusterGroupD);
	
	setTimeout(function(){
		map.addLayer(clusterGroup);
		map.fitBounds(clusterGroup.getBounds());
		$('#grid-filter-mobile-drop').html('Filter: All');	
		$("#grid-filter-menu").slideToggle(400);
	},300);
}

if(currArea == 'filter-transformations'){
	map.removeLayer(clusterGroup);
	map.removeLayer(clusterGroupB);
	map.removeLayer(clusterGroupC);
	map.removeLayer(clusterGroupD);
	
	setTimeout(function(){
		map.addLayer(clusterGroupA);
		map.fitBounds(clusterGroupA.getBounds());	
		$('#grid-filter-mobile-drop').html('Filter: Transformations');
		$("#grid-filter-menu").slideToggle(400);
	},300);	
}

if(currArea == 'filter-sustainability'){
	map.removeLayer(clusterGroupA);
	map.removeLayer(clusterGroupC);
	map.removeLayer(clusterGroupD);
	map.removeLayer(clusterGroup);
	
	setTimeout(function(){
		map.addLayer(clusterGroupB);
		map.fitBounds(clusterGroupB.getBounds());	
		$('#grid-filter-mobile-drop').html('Filter: Sustainability');
		$("#grid-filter-menu").slideToggle(400);
	},300);
}

if(currArea == 'filter-landRestoration'){
	map.removeLayer(clusterGroup);
	map.removeLayer(clusterGroupA);
	map.removeLayer(clusterGroupB);
	map.removeLayer(clusterGroupD);
	
	setTimeout(function(){
		map.addLayer(clusterGroupC);
		map.fitBounds(clusterGroupC.getBounds());	
		$('#grid-filter-mobile-drop').html('Filter: Land Restoration');
		$("#grid-filter-menu").slideToggle(400);
	},300);
}

if(currArea == 'filter-communityBuilder'){
	map.removeLayer(clusterGroup);
	map.removeLayer(clusterGroupA);
	map.removeLayer(clusterGroupB);
	map.removeLayer(clusterGroupC);
	
	setTimeout(function(){
		map.addLayer(clusterGroupD);
		map.fitBounds(clusterGroupD.getBounds());	
		$('#grid-filter-mobile-drop').html('Filter: Community Builder');
		$("#grid-filter-menu").slideToggle(400);
	},300);
}


});



