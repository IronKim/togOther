import { apiClient } from './ApiClient';

export const getCityList = () => apiClient.get('api/city/getCityList');
export const getCityByCityName = () => apiClient.get('api/city/getCity/${cityName}');