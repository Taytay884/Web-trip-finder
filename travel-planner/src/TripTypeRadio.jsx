import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function TravelByRadio({ onChange: onChangeProp }) {
	const onChange = (e) => {
		onChangeProp(e.target.value);
	};

	return (
		<FormControl onChange={onChange}>
			<FormLabel id="demo-row-radio-buttons-group-label">Travel by?</FormLabel>
			<RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
				<FormControlLabel value="Bike" control={<Radio />} label="Bike" />
				<FormControlLabel value="Car" control={<Radio />} label="Car" />
			</RadioGroup>
		</FormControl>
	);
}
