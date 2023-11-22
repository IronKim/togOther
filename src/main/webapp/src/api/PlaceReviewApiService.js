import { apiClient } from './ApiClient';

export const getPlaceReviewBySeq = (placeSeq) => apiClient.get(`api/placeReview/getPlaceReviewList/${placeSeq}`)

export const addPlaceReview = (placeReview) => apiClient.post('api/placeReview/addPlaceReview', placeReview);