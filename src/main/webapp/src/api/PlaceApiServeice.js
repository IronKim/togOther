import { apiClient } from './ApiClient';


export const getPlaceList = () => apiClient.get('api/place/getPlaceList');

export const getPlaceBySeq = (placeSeq) => apiClient.get(`api/place/getPlaceList/${placeSeq}`)

export const getPlaceReviewBySeq = (placeReviewSeq) => apiClient.get(`api/place/getPlaceReviewList/${placeReviewSeq}`)