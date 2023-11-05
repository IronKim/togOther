import { apiClient } from './ApiClient';


export const retrieveMain = () => apiClient.get('/');

export const retrieveCityList = () => apiClient.get('/getCityList');

export const retrievePlaceList = (id) => apiClient.get(`/getPlaceList/${id}`);


