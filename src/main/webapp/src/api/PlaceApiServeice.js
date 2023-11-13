import { apiClient } from './ApiClient';


export const getPlaceList = () => apiClient.get('api/place/getPlaceList');

export const getPlaceBySeq = (placeSeq) => apiClient.get(`api/place/getPlaceList/${placeSeq}`)