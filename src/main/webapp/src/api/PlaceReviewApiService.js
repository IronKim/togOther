import { apiClient } from './ApiClient';

export const getPlaceReviewBySeq = (placeSeq) => apiClient.get(`api/placeReview/getPlaceReviewList/${placeSeq}`)

export const getPlaceReviewListByReviewSeq = (reviewSeq) => apiClient.get(`api/placeReview/getPlaceReviewListByReviewSeq/${reviewSeq}`)

export const addPlaceReview = (placeSeq, placeReview) => apiClient.post(`api/placeReview/addPlaceReview/${placeSeq}`, placeReview);

export const deletePlaceReviewByReviewSeq = (placeSeq, reviewSeq) => apiClient.delete(`api/placeReview/deletePlaceReviewByReviewSeq/${placeSeq}/${reviewSeq}`);

export const updateReview = (reviewSeq,placeReview) => apiClient.put(`api/placeReview/updateReview/${reviewSeq}`,placeReview);

export const getPlaceReviewByUserSeq = (userSeq) => apiClient.get(`api/placeReview/getPlaceReviewByUserSeq/${userSeq}`)
