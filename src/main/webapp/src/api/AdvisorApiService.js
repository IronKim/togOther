import { apiClient } from './ApiClient';

export const getCity = () => apiClient.get('/api/advisor/getCity');

export const updateCity = (city) => apiClient.put('/api/advisor/updateCity', city); 

export const getPlaceByCitySeq = (citySeq) => apiClient.get(`/api/advisor/getPlaceByCitySeq/${citySeq}`);

export const updatePlace = (place) => apiClient.put('/api/advisor/updatePlace', place);