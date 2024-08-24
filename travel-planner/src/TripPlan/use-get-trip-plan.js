import { useApi } from '../use-api.js';
import { useState } from 'react';

export default function useGetTripPlan() {
	const [fetchData, fetchDataState] = useApi('trip-plan', {
		method: 'GET'
	});

	// const [fetchDataState, setFetchDataState] = useState({
	// 	loading: false,
	// 	error: null,
	// 	data: null
	// });

	const getTripPlan = (tripData) => {
		return fetchData({
			params: tripData
		});

		// setFetchDataState({ loading: true, error: null, data: null });

		// Mock data
		// setTimeout(() => {
		// 	return new Promise((resolve) => {
		// 		const data = {
		// 			data: {
		// 				country: 'Israel',
		// 				tripType: 'car',
		// 				days: [
		// 					{
		// 						day: 1,
		// 						totalDistanceKm: 200,
		// 						stops: [
		// 							{
		// 								lat: 31.7683,
		// 								lng: 35.2137,
		// 								description: 'Start in Tel Aviv',
		// 								info: "Tel Aviv, Israel's vibrant coastal metropolis, is renowned for its beaches, nightlife, and modern architecture. Explore the Bauhaus-style buildings in the White City, stroll along the promenade, and experience the city's bustling markets.",
		// 								pointsOfInterest: [
		// 									{
		// 										name: 'Carmel Market',
		// 										lat: 32.0758,
		// 										lng: 34.7786,
		// 										info: 'A vibrant and bustling market offering a kaleidoscope of goods, from fresh produce and spices to clothing and souvenirs. Enjoy the lively atmosphere and bargain for unique finds.'
		// 									},
		// 									{
		// 										name: 'Independence Hall',
		// 										lat: 32.073,
		// 										lng: 34.7745,
		// 										info: "A historic building that served as the headquarters of the Jewish Agency and where Israel's Declaration of Independence was proclaimed in 1948. Learn about the country's history and formation."
		// 									}
		// 								],
		// 								trek: false
		// 							},
		// 							{
		// 								lat: 31.9522,
		// 								lng: 35.1221,
		// 								description: 'Stop in Caesarea Maritima',
		// 								info: 'Caesarea Maritima is an ancient Roman port city with well-preserved ruins, including a hippodrome, amphitheater, and aqueduct. Discover the fascinating history of this once-thriving city, now an archeological site.',
		// 								pointsOfInterest: [
		// 									{
		// 										name: 'Roman Amphitheater',
		// 										lat: 32.4445,
		// 										lng: 34.9883,
		// 										info: 'A well-preserved Roman amphitheater that hosted gladiatorial contests and public spectacles. Imagine the vibrant atmosphere of these ancient events.'
		// 									},
		// 									{
		// 										name: 'Aqueduct',
		// 										lat: 32.4444,
		// 										lng: 34.9883,
		// 										info: "A remarkable engineering feat that supplied Caesarea with fresh water. Explore the aqueduct's intricate structure and learn about Roman engineering techniques."
		// 									}
		// 								],
		// 								trek: false
		// 							}
		// 						]
		// 					},
		// 					{
		// 						day: 2,
		// 						totalDistanceKm: 250,
		// 						stops: [
		// 							{
		// 								lat: 32.4444,
		// 								lng: 34.9883,
		// 								description: 'Continue to Haifa',
		// 								info: "Haifa, a beautiful city perched on the slopes of Mount Carmel, is known for its stunning views of the Mediterranean Sea and its diverse cultural heritage. Visit the Baha'i Gardens, explore the German Colony, and enjoy the city's vibrant arts scene.",
		// 								pointsOfInterest: [
		// 									{
		// 										name: "Baha'i Gardens",
		// 										lat: 32.8023,
		// 										lng: 35.014,
		// 										info: 'A series of terraced gardens, a UNESCO World Heritage Site, renowned for their breathtaking beauty and peaceful atmosphere. Take a leisurely stroll through the gardens and marvel at the intricate landscaping and stunning views.'
		// 									},
		// 									{
		// 										name: 'Stella Maris Monastery',
		// 										lat: 32.8044,
		// 										lng: 35.0174,
		// 										info: 'A historic Carmelite monastery offering panoramic views of Haifa and the Mediterranean Sea. Learn about the history of the monastery and explore its tranquil grounds.'
		// 									}
		// 								],
		// 								trek: false
		// 							},
		// 							{
		// 								lat: 32.7657,
		// 								lng: 35.0244,
		// 								description: 'Stop at Rosh Hanikra',
		// 								info: 'Rosh Hanikra is a breathtaking coastal site featuring stunning white cliffs carved by the sea. Explore the grottos, take a cable car ride down to the sea, and enjoy the dramatic views.',
		// 								pointsOfInterest: [
		// 									{
		// 										name: 'Grottos',
		// 										lat: 33.1057,
		// 										lng: 35.1909,
		// 										info: 'A series of natural caves carved by the sea, offering a unique and fascinating geological experience. Explore the grottos and marvel at the intricate formations.'
		// 									},
		// 									{
		// 										name: 'Rosh Hanikra Cable Car',
		// 										lat: 33.1062,
		// 										lng: 35.1912,
		// 										info: 'A scenic cable car ride that takes you down to the sea level, offering spectacular views of the cliffs and the Mediterranean Sea. Enjoy the ride and capture stunning photos.'
		// 									}
		// 								],
		// 								trek: false
		// 							}
		// 						]
		// 					},
		// 					{
		// 						day: 3,
		// 						totalDistanceKm: 150,
		// 						stops: [
		// 							{
		// 								lat: 33.1057,
		// 								lng: 35.1909,
		// 								description: 'Drive to Jerusalem',
		// 								info: "Jerusalem, a city of immense historical and religious significance, is home to sacred sites for Judaism, Christianity, and Islam. Visit the Western Wall, explore the Old City, and experience the city's vibrant atmosphere.",
		// 								pointsOfInterest: [
		// 									{
		// 										name: 'Western Wall',
		// 										lat: 31.7781,
		// 										lng: 35.2357,
		// 										info: 'The holiest site in Judaism, a remnant of the Second Temple. Witness the tradition of prayer and reflection at this sacred place.'
		// 									},
		// 									{
		// 										name: 'Church of the Holy Sepulchre',
		// 										lat: 31.7781,
		// 										lng: 35.235,
		// 										info: "A revered Christian church believed to be the site of Jesus' crucifixion, burial, and resurrection. Experience the spiritual significance of this iconic landmark."
		// 									},
		// 									{
		// 										name: 'Dome of the Rock',
		// 										lat: 31.7781,
		// 										lng: 35.235,
		// 										info: "A golden-domed mosque revered in Islam, believed to be the place where Muhammad ascended to heaven. Admire the mosque's architectural splendor and its historical significance."
		// 									}
		// 								],
		// 								trek: false
		// 							},
		// 							{
		// 								lat: 31.7833,
		// 								lng: 35.2167,
		// 								description: 'End in Jerusalem',
		// 								info: "Explore the winding streets of the Old City, visit the bustling Mahane Yehuda Market, and enjoy the city's unique cultural tapestry.",
		// 								pointsOfInterest: [
		// 									{
		// 										name: 'Mahane Yehuda Market',
		// 										lat: 31.7833,
		// 										lng: 35.2167,
		// 										info: 'A vibrant and lively market offering a wide array of food, spices, and souvenirs. Experience the sensory overload and taste the flavors of Jerusalem.'
		// 									},
		// 									{
		// 										name: 'Israel Museum',
		// 										lat: 31.7732,
		// 										lng: 35.1996,
		// 										info: "A comprehensive museum showcasing Israeli art, archeology, and history. Explore the museum's galleries and learn about the country's rich cultural heritage."
		// 									}
		// 								],
		// 								trek: false
		// 							}
		// 						]
		// 					}
		// 				]
		// 			}
		// 		};
		// 		setFetchDataState({ loading: false, error: null, data });
		// 		resolve(data);
		// 	});
		// }, 1000);
	};

	return [getTripPlan, fetchDataState];
}
