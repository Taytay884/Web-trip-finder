import { useApi } from '../use-api.js';

export default function useGetTripPlan() {
	const [fetchData, fetchDataState] = useApi('trip-plan', {
		method: 'GET'
	});

	const getTripPlan = (tripData) => {
		return fetchData({
			params: tripData
		});
	};

	return [getTripPlan, fetchDataState];
}
