import Box from '@mui/material/Box';
import { useEffect } from 'react';
import useGetTripPlan from './use-get-trip-plan.js';
import useGetTripPhoto from './use-get-trip-photo.js';
import TripPlanMap from './TripPlanMap.jsx';
import { CircularProgress } from '@mui/material'; // Assuming this is the hook for fetching the photo

function TripPlan({ id, tripData }) {
	const [getTripPhoto, { data: photoData, loading: loadingPhoto, error: errorPhoto }] = useGetTripPhoto();
	const [getTripPlan, { data: dataPlan, loading: loadingPlan, error: errorPlan }] = useGetTripPlan();
	const loading = loadingPhoto || loadingPlan;
	const data = photoData || dataPlan;

	useEffect(() => {
		if (tripData) {
			getTripPhoto(tripData);
			getTripPlan(tripData);
		}
	}, [tripData]);

	return (
		<Box
			id={id}
			sx={{
				display: 'grid',
				placeItems: 'center',
				width: '100%',
				minHeight: '100vh',
				overflow: 'hidden',
				padding: '20px'
			}}
		>
			{loading ? (
				<CircularProgress />
			) : data ? (
				<>
					{errorPhoto ? (
						<p>Error loading photo: {errorPhoto.message}</p>
					) : (
						<Box
							component="img"
							src={photoData?.imageUrl} // Adjust according to the structure of your photoData
							alt="Trip photo"
							sx={{ width: 512, height: 512, objectFit: 'cover', marginBlockEnd: '20px' }}
						/>
					)}

					{errorPlan ? <p>Error: {errorPlan.message}</p> : dataPlan && <TripPlanMap tripData={dataPlan.data} />}
					<Box
						component="pre"
						sx={{
							backgroundColor: '#f4f4f4',
							border: '1px solid #ddd',
							borderRadius: '4px',
							padding: '16px',
							marginTop: '20px',
							width: '100%',
							overflowX: 'auto',
							fontFamily: 'monospace',
							fontSize: '0.875rem',
							color: '#333'
						}}
					>
						{`
				I am building a web app for planning 3-day trips by car or bike in different countries.
				Please generate a structured JSON object for a 3-day trip in ${tripData?.country} by ${tripData?.tripType} based on the following criteria:

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
					"country": "\${country}",
					"tripType": "\${tripType}",
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
				`}
					</Box>
				</>
			) : null}
		</Box>
	);
}

export { TripPlan as default };
