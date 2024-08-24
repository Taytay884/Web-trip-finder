import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'; // Import the CSS for routing machine
import 'leaflet-routing-machine'; // Import the routing machine plugin
import locationPin from '../assets/location-pin.png'; // Adjust the path to your marker icon

// Create custom icons with labels
const createLabelIcon = (label) => {
	return L.divIcon({
		className: 'custom-label-icon',
		html: `<div class="label-box">${label}</div>`,
		iconSize: [100, 40],
		iconAnchor: [50, 20],
		popupAnchor: [0, -20]
	});
};

// Custom icon for POI markers
const poiIcon = new L.Icon({
	iconUrl: locationPin, // Replace with your marker icon
	iconSize: [20, 20], // Smaller size for POI markers
	iconAnchor: [10, 10],
	popupAnchor: [0, -10]
});

const colors = ['#FF5733', '#33FF57', '#3357FF']; // Colors for each day's route

function TripPlanMap({ tripData }) {
	const mapRef = useRef(null);
	const mapInstanceRef = useRef(null);

	useEffect(() => {
		if (!tripData) return;

		// Create map only if it doesn't already exist
		if (!mapInstanceRef.current) {
			// Calculate the center of the map by averaging all latitudes and longitudes
			const allStops = tripData.days.flatMap((day) => day.stops);
			const centerLat = allStops.reduce((acc, stop) => acc + stop.lat, 0) / allStops.length;
			const centerLng = allStops.reduce((acc, stop) => acc + stop.lng, 0) / allStops.length;

			// Initialize the map
			mapInstanceRef.current = L.map(mapRef.current).setView([centerLat, centerLng], 12);

			// Add the tile layer
			L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			}).addTo(mapInstanceRef.current);
		}

		const lastTripStop =
			tripData.days[tripData.days.length - 1].stops[tripData.days[tripData.days.length - 1].stops.length - 1];
		// Add routes and markers
		tripData.days.forEach((day, index) => {
			const positions = day.stops.map((stop) => [stop.lat, stop.lng]);

			// Draw the route
			const routingControl = L.Routing.control({
				waypoints: positions.map((pos) => L.latLng(pos[0], pos[1])),
				lineOptions: { styles: [{ color: colors[index % colors.length], weight: 4 }] },
				createMarker: () => null, // Disable default markers
				routeWhileDragging: false, // Disable route dragging
				showAlternatives: false // Disable alternative routes
			}).addTo(mapInstanceRef.current);

			// Get the total distance for the day
			routingControl.on('routesfound', function (e) {
				const route = e.routes[0];
				const distanceInKm = (route.summary.totalDistance / 1000).toFixed(2); // Convert meters to kilometers

				// Add markers with labels and popups
				day.stops.forEach((stop, stopIndex) => {
					// Determine the label based on stop position
					let label = '';
					if (stopIndex === 0) {
						label = `Day ${day.day} Start`;
					} else if (stop.lat === lastTripStop.lat && stop.lng === lastTripStop.lng) {
						label = `Day ${day.day} End`;
					} else {
						return;
					}

					const marker = L.marker([stop.lat, stop.lng], { icon: createLabelIcon(label) }).addTo(mapInstanceRef.current);
					let popupContent = `<strong>${stop.description}</strong><br>${stop.info}`;

					// Add distance info at the start and end points of each day
					if (stopIndex === 0) {
						popupContent += `<br><strong>Distance for Day ${day.day}: ${distanceInKm} km</strong>`;
					} else if (stopIndex === day.stops.length - 1) {
						popupContent += `<br><strong>Total Distance for Day ${day.day}: ${distanceInKm} km</strong>`;
					}

					popupContent += '<ul>';
					stop.pointsOfInterest.forEach((poi) => {
						popupContent += `<li><strong>${poi.name}:</strong> ${poi.info}</li>`;
						// Add POI markers
						L.marker([poi.lat, poi.lng], { icon: poiIcon })
							.addTo(mapInstanceRef.current)
							.bindPopup(`<strong>${poi.name}</strong><br>${poi.info}`);
					});
					popupContent += '</ul>';
					marker.bindPopup(popupContent);
				});
			});
		});
	}, [tripData]);

	return (
		<>
			<div ref={mapRef} style={{ height: '80vh', width: '80%' }} />
			<style>
				{`
                    .custom-label-icon .label-box {
                        background-color: white;
                        color: black;
                        border: 1px solid #333;
                        padding: 5px;
                        border-radius: 3px;
                        text-align: center;
                        font-size: 12px;
                        width: 100px; /* Adjust width as needed */
                    }
                    /* Hide default routing control instructions */
                    .leaflet-routing-container {
                        display: none !important;
                    }
                `}
			</style>
		</>
	);
}

export default TripPlanMap;
