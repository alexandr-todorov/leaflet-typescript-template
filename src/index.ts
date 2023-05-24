import L, { LatLngBounds, LatLngTuple, PolylineOptions } from 'leaflet';
import './style.scss';

import marker2x from 'leaflet/dist/images/marker-icon-2x.png';
import marker from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import "@geoman-io/leaflet-geoman-free";
import { ModulesMockData } from './resources/modules_mock';

delete (<any>L.Icon.Default.prototype)._getIconUrl;

L.Icon.Default.mergeOptions({
	iconRetinaUrl: marker2x,
	iconUrl: marker,
	shadowUrl: markerShadow,
});

window.onload = () => {
	const za = new Leaflet();
	za.Run();
};


class Leaflet {
	/**
	* Run
	*/
	public Run() {
		// let map: L.Map = L.map('map').setView([51.505, -0.09], 13);

		//Map definition
	const map = L.map('map', {
		renderer: L.canvas(),
		crs: L.CRS.Simple,
		minZoom: -6,
		// rotateControl: {
		// 			closeOnZeroBearing: false,
		// 			position: 'bottomleft',
		// 		},
	});

	function xy(x: number, y: number) {
		if (Array.isArray(x)) { // When doing xy([x, y]);
			return L.latLng(x[1], x[0]);
		}
		return L.latLng(y, x); // When doing xy(x, y);
	}

	const length = 100000; //100m
	const width = 80000; //80m
	const startingPoint = xy(0, 0);
	const endingPoint = xy(length, width);
	const roofLayout = L.rectangle(
		new LatLngBounds(startingPoint, endingPoint), 
		{
			//pmIgnore: true,
			color: 'grey'
		} as PolylineOptions
	).addTo(map);
	
	var setbackDistance = 600;
	//Setback distance layer
	const setbackDistanceSquare = L.rectangle(
		new LatLngBounds(xy(setbackDistance, setbackDistance),
		xy(length - setbackDistance, width - setbackDistance))
	, 
	{
		pmIgnore: true,
		color: 'green',
		weight: 1,
		// fill: 0,
	}).addTo(map);  

	//Layers
	// var bracketLayer = L.geoJSON(bracketData);
   
	// var anchorLayer = L.layerGroup();  
	// var anchorLayerGeoJson =  L.geoJSON(anchorData, {onEachFeature: onEachAnchor});
	// const pvImageUrl = "https://solarsupply.co.za/wp-content/uploads/2020/11/CSUN-330W-Solar-Panel-Polycrystalline.png";
	const pvImageUrl = "https://svgshare.com/i/tVQ.svg";

	  
	var moduleLayer = L.layerGroup(); 
	var moduleLayerData = L.layerGroup(); 
	const moduleData = ModulesMockData.GetMockData() as any;
	var moduleLayerGeoJson = L.geoJSON(moduleData as any, {onEachFeature: onEachModule});     
	   var drawLayer = L.layerGroup();
			
	   //GeoJSON interactivity functions
  function onEachModule(feature: any, layer: any) {   
    moduleLayer.addLayer(L.imageOverlay(pvImageUrl, layer.getBounds()));   
    var module = L.rectangle(layer.getBounds(), {weight: 1});    
    module.bindTooltip("<ul><li>Sli:" + feature.properties.uplift +"kg</li><li>Upl:"+ feature.properties.sliding + "kg</li></ul>", 													{permanent: true, direction: "center", className: "leaflet-tooltip"}) 
    
    moduleLayerData.addLayer(module);  
  }

 //Controls 
	L.control.layers(
					{"Layout": roofLayout}, 
					{"Modules": moduleLayer,
					// "Module info": moduleLayerData,
					// "Anchors": anchorLayer, 
					// "Brackets": bracketLayer, 
					"Drawn items": drawLayer})
					.addTo(map);   

	map.pm.setGlobalOptions({layerGroup: drawLayer});

	map.fitBounds(roofLayout.getBounds());  
	
	// var c = new L.Control.getPosition();
	// c.addTo(map);
	
	// function onMapMove(e: any) {
	// 	c.setCoordinates(e);
	// }
	
	// map.on('mousemove', onMapMove);
	map.on('pm:create', function(e)
	{  	
		console.log(drawLayer.toGeoJSON());
	})

		// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		// 	attribution:
		// 		'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		// }).addTo(map);

		// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		// 	maxZoom: 19,
		// 	attribution:
		// 		'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
		// }).addTo(map);

		// L.marker([51.5, -0.09])
		// 	.addTo(map)
		// 	.bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
		// 	.openPopup();
	}
}