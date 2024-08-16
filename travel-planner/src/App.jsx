import { Button, Grid, Stack, Typography, useTheme } from '@mui/material';
import CountrySelect from './CountrySelector.jsx';
import TravelByRadio from './TripTypeRadio.jsx';
import { useState } from 'react';

function App() {
	const theme = useTheme();
	const [country, setCountry] = useState('');
	const [tripType, setTripType] = useState('');

	return (
		<Grid
			sx={{
				backgroundColor: theme.palette.background.paper,
				height: '100vh',
				width: '100vw',
				display: 'grid',
				placeItems: 'center'
			}}
		>
			<Stack gap={5}>
				<Typography textAlign="center" variant="h1">
					Travel Planner
				</Typography>
				<Stack direction="row" gap={4} sx={{ placeItems: 'center' }}>
					<CountrySelect onChange={setCountry} />
					<TravelByRadio onChange={setTripType} />
					<Button variant="contained" disabled={!country || !tripType}>
						Plan Trip
					</Button>
				</Stack>
			</Stack>
		</Grid>
	);
}

export default App;
