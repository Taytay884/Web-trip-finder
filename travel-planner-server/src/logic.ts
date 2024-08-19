import { TripData } from './types';
// import fetch from 'node-fetch';
const fetch = require('node-fetch');

import { fetchTripDataFromGemini } from './gemini';

export function getGeneratedImage({ country, tripType }: TripData): string {
	console.log(country, tripType);
	// Get the image from the stablehordeAI API

	return 'path/to/image.jpeg';
}

export async function fetchTripData(tripData: TripData): Promise<any> {
	await fetchTripDataFromGemini(tripData);
	return {
		country: 'Spain',
		tripType: 'Car'
	};
}
