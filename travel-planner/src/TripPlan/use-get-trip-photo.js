import { useApi } from '../use-api.js';

export default function useGetTripPhoto() {
	const [fetchData, fetchDataState] = useApi('trip-photo', {
		method: 'GET'
	});

	const getTripPhoto = (tripData) => {
		return fetchData({
			params: tripData
		});
	};

	return [getTripPhoto, fetchDataState];
}
