type tripData = {
	country: string;
	tripType: 'Bike' | 'Car';
};

export function getGeneratedImage({ country, tripType }: tripData): string {
	console.log(country, tripType);
	// Get the image from the stablehordeAI API

	return 'path/to/image.jpeg';
}
