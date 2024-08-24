import { Storage } from '@google-cloud/storage';
import { MongoClient } from 'mongodb';
import axios from 'axios';
import { envs } from './core/config/env';
import { TripData } from './types';
import * as fs from 'fs';
import * as path from 'path';
import { fetchTripDataFromGemini } from './gemini';

// Initialize MongoDB client
const client = new MongoClient(envs.MONGODB_URI);

// Initialize Google Cloud Storage client
const storage = new Storage({
	keyFilename: path.join(__dirname, '../service-account-key.json'), // Update this path
	projectId: 'mineral-oxide-429215-t8'
});

// Define your bucket name
const bucketName = 'travel_planner_img';

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

		// Download the image to a temporary file
		const filePath = await downloadImage(tripData, imageUrl);

		// Upload the image to Google Cloud Storage
		const googleCloudUrl = await uploadImageToGoogleCloud(filePath);

		// Save the Google Cloud URL to MongoDB
		await saveImageUrlToMongo(googleCloudUrl);

		// Clean up the temporary file
		fs.unlinkSync(filePath);

		return googleCloudUrl;
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

async function downloadImage(tripData: TripData, url: string): Promise<string> {
	const response = await axios({
		url,
		method: 'GET',
		responseType: 'stream'
	});

	const filePath = path.join(__dirname, `${tripData.country}_with_${tripData.tripType}_image.png`);
	const writer = fs.createWriteStream(filePath);

	return new Promise((resolve, reject) => {
		response.data.pipe(writer);
		writer.on('finish', () => resolve(filePath));
		writer.on('error', reject);
	});
}

async function uploadImageToGoogleCloud(filePath: string): Promise<string> {
	try {
		const bucket = storage.bucket(bucketName);
		const fileName = path.basename(filePath);
		const file = bucket.file(fileName);

		// Upload the file to Google Cloud Storage
		await bucket.upload(filePath, {
			destination: fileName
		});

		// Make the file publicly accessible
		await file.makePublic();

		console.log(`File uploaded to Google Cloud Storage: ${fileName}`);

		return `https://storage.googleapis.com/${bucketName}/${fileName}`;
	} catch (error) {
		console.error('Error uploading image to Google Cloud:', error);
		throw new Error('Failed to upload image to Google Cloud');
	}
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
