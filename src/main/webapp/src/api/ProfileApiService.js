import { apiClient } from './ApiClient';

export const getUserByUserSeq = (userSeq) => apiClient.get(`api/profile/getUserByUserSeq/${userSeq}`)