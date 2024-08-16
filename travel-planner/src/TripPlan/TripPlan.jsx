import Box from '@mui/material/Box';
import { useEffect } from 'react';
import useGetTripPlan from './use-get-trip-plan.js';

function TripPlan({ id, tripData }) {
	const [getTripPlan, { data, loading, error }] = useGetTripPlan();

	useEffect(() => {
		if (tripData) {
			getTripPlan(tripData);
		}
	}, [tripData]);

	return (
		<Box id={id} sx={{ width: '100%', minHeight: '100vh', overflow: 'hidden' }}>
			<Box
				sx={{
					display: 'grid',
					placeItems: 'center',
					height: '100%',
					width: '100%',
					backgroundColor: 'rgba(0, 0, 0, 0.5)',
					color: 'white'
				}}
			>
				{loading && <p>Loading...</p>}
				{error && <p>Error: {error.message}</p>}
				{data && <Box>{JSON.stringify(data)}</Box>}
			</Box>
		</Box>
	);
}

export { TripPlan as default };
