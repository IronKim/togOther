import { apiClient } from './ApiClient';

export const getPlaceList = () => apiClient.get('api/place/getPlaceList');

export const getPlaceBySeq = (placeSeq) => apiClient.get(`api/place/getPlaceList/${placeSeq}`)

export const addCustomPlace = (customPlace) => apiClient.post(`api/place/addCustomPlace`,customPlace)

export const getPlaceListByCitySeq = (citySeq) => apiClient.get(`api/place/getPlaceListByCitySeq/${citySeq}`)

export const getPlaceReviewBySeq = (placeSeq) => apiClient.get(`api/place/getPlaceReviewList/${placeSeq}`)


export const getCustomPlace = (plCustomSeq) => apiClient.get(`api/place/getCustomPlace/${plCustomSeq}`)

export const getPlace = (placeSeq) => apiClient.get(`api/place/getPlace/${placeSeq}`)