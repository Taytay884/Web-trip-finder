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

					{errorPlan ? <p>Error: {errorPlan.message}</p> : dataPlan ? <TripPlanMap tripData={dataPlan.data} /> : null}
				</>
			) : null}
		</Box>
	);
}

export { TripPlan as default };
