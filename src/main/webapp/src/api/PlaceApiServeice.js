import { apiClient } from './ApiClient';


export const getPlaceList = () => apiClient.get('api/place/getPlaceList');

export const getPlaceListByCitySeq = (citySeq) => apiClient.get(`api/place/getPlaceListByCitySeq/${citySeq}`)

export const getPlaceBySeq = (placeSeq) => apiClient.get(`api/place/getPlaceList/${placeSeq}`)