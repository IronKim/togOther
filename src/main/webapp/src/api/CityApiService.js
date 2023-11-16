import { apiClient } from './ApiClient';


export const getCityBySeq = (citySeq) => apiClient.get(`api/city/getCity/${citySeq}`)

export const getCityList = () => apiClient.get('api/city/getCityList');

export const getCityByCityName = () => apiClient.get('api/city/getCity/${cityName}');

