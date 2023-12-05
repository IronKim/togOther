import { apiClient } from './ApiClient';

export const getPlaceReviewBySeq = (placeSeq) => apiClient.get(`api/placeReview/getPlaceReviewList/${placeSeq}`)

export const getPlaceReviewListByReviewSeq = (reviewSeq) => apiClient.get(`api/placeReview/getPlaceReviewListByReviewSeq/${reviewSeq}`)

export const addPlaceReview = (placeReview) => apiClient.post('api/placeReview/addPlaceReview', placeReview);

export const deletePlaceReviewByReviewSeq = (reviewSeq) => apiClient.delete(`api/placeReview/deletePlaceReviewByReviewSeq/${reviewSeq}`);

export const updateReview = (reviewSeq,placeReview) => apiClient.put(`api/placeReview/updateReview/${reviewSeq}`,placeReview);

export const getPlaceReviewByUserSeq = (userSeq) => apiClient.get(`api/placeReview/getPlaceReviewByUserSeq/${userSeq}`)
