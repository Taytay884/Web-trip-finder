import { Button, Card, CardContent, CardHeader, Grid, Stack, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import backgroundImage from '../assets/travel-planner-wallpaper.jpeg';
import CountrySelect from './CountrySelector.jsx';
import TravelByRadio from './TripTypeRadio.jsx';

function TripForm({ onSubmit }) {
	const theme = useTheme();
	const [country, setCountry] = useState('');
	const [tripType, setTripType] = useState('');

	return (
		<Grid
			sx={{
				backgroundImage: `url(${backgroundImage})`,
				backgroundSize: 'cover',
				backgroundClip: 'content-box',
				backgroundPosition: 'center',
				backgroundColor: theme.palette.background.paper,
				display: 'grid',
				placeItems: 'center',
				height: '100vh',
				width: '100%'
			}}
		>
			<Card sx={{ padding: 5 }} raised>
				<CardHeader title={<Typography variant="h3">Travel Planner</Typography>} />
				<CardContent>
					<Stack gap={5}>
						<Stack direction="row" gap={4} sx={{ placeItems: 'center' }}>
							<CountrySelect onChange={setCountry} />
							<TravelByRadio onChange={setTripType} />
							<Button
								variant="contained"
								disabled={!country || !tripType}
								onClick={() => onSubmit({ country, tripType })}
							>
								Plan Trip
							</Button>
						</Stack>
					</Stack>
				</CardContent>
			</Card>
		</Grid>
	);
}

export { TripForm as default };
