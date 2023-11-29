import { apiClient } from './ApiClient';

//
export const addPlanner = (planner) => apiClient.post('api/planner/addPlanner', planner);
export const addSubItem = (subItem) => apiClient.post('api/planner/addSubItem', subItem);
export const addPlannerText = (plannerText) => apiClient.post('api/planner/addPlannerText', plannerText);
export const uploadPlannerImage = (plannerImage) => apiClient.post('api/storage/upload', plannerImage);
export const addPlannerImage = (plannerImage) => apiClient.post('api/planner/addPlannerImage', plannerImage);
export const deletePlanner = (plannerSeq) => apiClient.delete(`api/planner/deletePlanner/${plannerSeq}`);
//
export const getPlanner = (n) => apiClient.post('api/planner/getPlanner', n);
export const totPlanner = (n) => apiClient.post('api/planner/totPlanner', n);
export const getImages = (n) => apiClient.post('api/planner/getImages', n);
//
export const getPlannerView = (plannerSeq) => apiClient.get(`api/planner/getPlannerView/${plannerSeq}`)
//
export const getMyPlanner = (n) => apiClient.post('api/planner/getMyPlanner', n);
export const totMyPlanner = (n) => apiClient.post('api/planner/totMyPlanner', n);
export const updatePublicPlan = (plannerSeq, plan) => apiClient.put(`api/planner/updatePublicPlan/${plannerSeq}`, plan);