import { apiClient } from './ApiClient';

export const getCityBySeq = (citySeq) => apiClient.get(`api/city/getCity/${citySeq}`)