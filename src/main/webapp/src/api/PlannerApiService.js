import { apiClient } from './ApiClient';

export const addPlanner = (planner) => apiClient.post('api/planner/addPlanner', planner);
export const addSubItem = (subItem) => apiClient.post('api/planner/addSubItem', subItem);
export const addPlannerText = (plannerText) => apiClient.post('api/planner/addPlannerText', plannerText);
export const uploadPlannerImage = (plannerImage) => apiClient.post('api/storage/upload', plannerImage);
export const addPlannerImage = (plannerImage) => apiClient.post('api/planner/addPlannerImage', plannerImage);
export const totPlanner = (n) => apiClient.post('api/planner/totPlanner', n);
export const getPlanner = (n) => apiClient.post('api/planner/getPlanner', n);
export const getImages = (n) => apiClient.post('api/planner/getImages', n);