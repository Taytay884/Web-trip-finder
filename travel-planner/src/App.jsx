import TripForm from './TripForm/TripForm.jsx';
import { Stack } from '@mui/material';
import TripPlan from './TripPlan/TripPlan.jsx';
import { useState } from 'react';

const TRIP_PLAN_ELE_ID = 'trip-plan';

function App() {
	const [tripData, setTripData] = useState(null);

	const onSubmit = (data) => {
		setTripData(data);
		window.scrollTo({
			top: document.getElementById(TRIP_PLAN_ELE_ID).offsetTop,
			behavior: 'smooth'
		});
	};

	return (
		<Stack sx={{ width: '100%' }}>
			<TripForm onSubmit={onSubmit} />
			<TripPlan id={TRIP_PLAN_ELE_ID} tripData={tripData} />
		</Stack>
	);
}

export default App;
