import { envs } from './core/config/env';
import OpenAI from 'openai';
import { TripData } from './types';
const openai = new OpenAI({ apiKey: envs.OPEN_AI_API_KEY });

export async function fetchTripDataFromOpenAI({ country, tripType }: TripData) {
	const completion = await openai.chat.completions.create({
		model: 'gpt-3.5-turbo',
		messages: [
			{
				role: 'system',
				content:
					'"I am building a web app for planning 3-day trips by car or bike in different countries. I need you to generate a structured JSON object for a 3-day trip in a specific country based on the following criteria:\n' +
					'\n' +
					'Trip Type: Either by bike or car.\n' +
					'\n' +
					'For a bike, each day’s trip can be up to 80 km.\n' +
					'For a car, each day’s trip should be between 80 km and 300 km.\n' +
					'For Each Day of the Trip:\n' +
					'\n' +
					'Include the total distance in km for the day.\n' +
					'Create an array of stops for each day.\n' +
					'For each stop, include:\n' +
					'Latitude (lat) and Longitude (lng) of the location.\n' +
					'A description of the stop.\n' +
					'Info about the stop (detailed context such as historical significance, activities, or cultural relevance).\n' +
					'A list of points of interest at that stop, where each point includes:\n' +
					'Name of the point of interest.\n' +
					'Latitude (lat) and Longitude (lng).\n' +
					'Info about the point (historical or cultural details).\n' +
					'Whether there is a trek at the stop. If there is a trek, include:\n' +
					'Trek name.\n' +
					'Latitude (lat) and Longitude (lng) of the trek’s start point.\n' +
					'A brief info about the trek (length, terrain, difficulty level, and what the trek offers in terms of views or experiences).\n' +
					'Generate the JSON object for a trip to [COUNTRY] by [TRIP TYPE: car or bike], and ensure that the route is continuous and covers 3 days. The JSON structure should look like this:\n' +
					'\n' +
					'json\n' +
					'Copy code\n' +
					'{\n' +
					'  "country": "COUNTRY",\n' +
					'  "tripType": "car",\n' +
					'  "days": [\n' +
					'    {\n' +
					'      "day": 1,\n' +
					'      "totalDistanceKm": 75,\n' +
					'      "stops": [\n' +
					'        {\n' +
					'          "lat": 52.5200,\n' +
					'          "lng": 13.4050,\n' +
					'          "description": "Start in Berlin",\n' +
					'          "info": "Detailed description about Berlin...",\n' +
					'          "pointsOfInterest": [\n' +
					'            {\n' +
					'              "name": "Brandenburg Gate",\n' +
					'              "lat": 52.5163,\n' +
					'              "lng": 13.3777,\n' +
					'              "info": "Detailed context about Brandenburg Gate..."\n' +
					'            },\n' +
					'            {\n' +
					'              "name": "Museum Island",\n' +
					'              "lat": 52.5169,\n' +
					'              "lng": 13.4019,\n' +
					'              "info": "Detailed context about Museum Island..."\n' +
					'            }\n' +
					'          ],\n' +
					'          "trek": false\n' +
					'        },\n' +
					'        {\n' +
					'          "lat": 52.3700,\n' +
					'          "lng": 13.5700,\n' +
					'          "description": "Stop in Potsdam",\n' +
					'          "info": "Detailed description about Potsdam...",\n' +
					'          "pointsOfInterest": [\n' +
					'            {\n' +
					'              "name": "Sanssouci Palace",\n' +
					'              "lat": 52.4044,\n' +
					'              "lng": 13.0364,\n' +
					'              "info": "Detailed context about Sanssouci Palace..."\n' +
					'            }\n' +
					'          ],\n' +
					'          "trek": true,\n' +
					'          "trekInfo": {\n' +
					'            "name": "Sanssouci Park Trek",\n' +
					'            "lat": 52.4000,\n' +
					'            "lng": 13.0370,\n' +
					'            "info": "Details about the trek..."\n' +
					'          }\n' +
					'        }\n' +
					'      ]\n' +
					'    },\n' +
					'    {\n' +
					'      "day": 2,\n' +
					'      "totalDistanceKm": 80,\n' +
					'      "stops": [...]\n' +
					'    },\n' +
					'    {\n' +
					'      "day": 3,\n' +
					'      "totalDistanceKm": 78,\n' +
					'      "stops": [...]\n' +
					'    }\n' +
					'  ]\n' +
					'}\n' +
					'Make sure to provide detailed descriptions for each stop, point of interest, and trek. The trip should be logical and continuous with reasonable travel distances for each day."\n' +
					'\n'
			},
			{
				role: 'user',
				content: `Country ${country}, Trip Type ${tripType}`
			}
		]
	});

	console.log(completion.choices[0].message);
}
