import { envs } from './core/config/env';
import { TripData } from './types';

import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(envs.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export async function fetchTripDataFromGemini({ country, tripType }: TripData) {
	const prompt = `
    I am building a web app for planning 3-day trips by car or bike in different countries.
    Please generate a structured JSON object for a 3-day trip in ${country} by ${tripType} based on the following criteria:

    - The trip must be continuous, meaning each day's end should be the start of the next day.
    - Trip Type: Either by bike or car.
    - For a bike, each day’s trip can be up to 80 km.
    - For a car, each day’s trip should be between 80 km and 300 km.
    - For Each Day of the Trip:
      - Include the total distance in km for the day.
      - Create an array of stops for each day.
      - For each stop, include:
        - Latitude (lat) and Longitude (lng) of the location.
        - A description of the stop.
        - Information about the stop (detailed context such as historical significance, activities, or cultural relevance).
        - A list of points of interest at that stop, where each point includes:
          - Name of the point of interest.
          - Latitude (lat) and Longitude (lng).
          - Information about the point (historical or cultural details).
        - Whether there is a trek at the stop. If there is a trek, include:
          - Trek name.
          - Latitude (lat) and Longitude (lng) of the trek’s start point.
          - A brief description of the trek (length, terrain, difficulty level, and what the trek offers in terms of views or experiences).
      
    Ensure that the JSON object structure strictly follows this format:

    {
      "country": "${country}",
      "tripType": "${tripType}",
      "days": [
        {
          "day": 1,
          "totalDistanceKm": <distance>,
          "stops": [
            {
              "lat": <latitude>,
              "lng": <longitude>,
              "description": "<description>",
              "info": "<info>",
              "pointsOfInterest": [
                {
                  "name": "<name>",
                  "lat": <latitude>,
                  "lng": <longitude>,
                  "info": "<info>"
                },
                ...
              ],
              "trek": <boolean>,
              "trekInfo": {
                "name": "<name>",
                "lat": <latitude>,
                "lng": <longitude>,
                "info": "<info>"
              }
            },
            ...
          ]
        },
        ...
      ]
    }

    Ensure the data is consistent and the route is continuous over 3 days.
    Please respond only with valid JSON. Do not include any additional text, explanations, or notes.
  `;

	const result = await model.generateContent(prompt);
	const response = await result.response;
	const text = await response.text();

	// Remove code blocks and clean the JSON string
	const cleanText = text
		.replace(/```json/g, '')
		.replace(/```/g, '')
		.replace(/\n/g, '')
		.trim();

	// Parse the JSON string
	try {
		const parsedJSON = JSON.parse(cleanText);
		return parsedJSON;
	} catch (error) {
		console.error('Failed to parse JSON:', error);
		throw new Error('Failed to parse the JSON response.');
	}
}
