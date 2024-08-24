import { useState } from 'react';
import axios from 'axios';

const API_URL = 'https://web-trip-finder.onrender.com';
// const API_URL = 'http://localhost:3000';

export const useApi = (route, options = {}) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchData = async (optionsParam = {}) => {
		setLoading(true);

		try {
			const response = await axios(`${API_URL}/${route}`, { ...options, ...optionsParam });
			setData(response.data);
		} catch (error) {
			setError(error);
		}

		setLoading(false);
	};

	return [fetchData, { data, loading, error }];
};
