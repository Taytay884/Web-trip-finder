import { TripData } from './types';
import { MongoClient } from 'mongodb';
import axios from 'axios';
import { envs } from './core/config/env';
import { fetchTripDataFromGemini } from './gemini';

const client = new MongoClient(envs.MONGODB_URI);

export async function getGeneratedImage(tripData: TripData): Promise<string> {
	try {
		// Request to generate the image
		const generateResponse = await axios.post(
			'https://stablehorde.net/api/v2/generate/async',
			{
				prompt: `A scenic view of ${tripData.country} for a ${tripData.tripType} trip.`,
				params: {
					cfg_scale: 7.5,
					denoising_strength: 0.75,
					seed: '312912',
					height: 512,
					width: 512,
					seed_variation: 1,
					steps: 10
				}
			},
			{
				headers: {
					accept: 'application/json',
					apikey: '0000000000',
					'Client-Agent': 'unknown:0:unknown',
					'Content-Type': 'application/json'
				}
			}
		);

		const generateData: { id: string } = generateResponse.data as { id: string };
		const imageId = generateData.id;

		// Wait for the image to be generated and get the image URL
		let imageUrl = await waitForImageUrl(imageId);

		// Save the image URL to MongoDB
		await saveImageUrlToMongo(imageUrl);

		return imageUrl;
	} catch (error) {
		console.error('Error generating image:', error);
		throw new Error('Failed to generate image');
	}
}

async function waitForImageUrl(imageId: string): Promise<string> {
	let statusResponse: any;
	let statusData: { generations: { img: string }[] };

	// Polling every 2 seconds until the image is ready
	do {
		statusResponse = await axios.get(`https://stablehorde.net/api/v2/generate/status/${imageId}`, {
			headers: {
				Accept: 'application/json',
				'Client-Agent': 'unknown:0:unknown'
			}
		});

		// Delay for 2 seconds before the next request

		await new Promise((resolve) => setTimeout(resolve, 2000));
	} while (statusResponse.data.finished !== 1);

	statusData = statusResponse.data as { generations: { img: string }[] };
	return statusData.generations[0].img;
}

async function saveImageUrlToMongo(imageUrl: string): Promise<void> {
	try {
		await client.connect();
		const database = client.db('travel_planner');
		const imagesCollection = database.collection('images');
		await imagesCollection.insertOne({ url: imageUrl, createdAt: new Date() });
		console.log('Image URL saved to MongoDB:', imageUrl);
	} catch (error) {
		console.error('Error saving image URL to MongoDB:', error);
		throw new Error('Failed to save image URL to database');
	} finally {
		await client.close();
	}
}

export async function fetchTripData(tripData: TripData): Promise<any> {
	return fetchTripDataFromGemini(tripData);
}
