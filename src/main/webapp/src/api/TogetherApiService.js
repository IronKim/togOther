import { apiClient } from './ApiClient';

export const addTogether = (together) => apiClient.post('api/together/addTogether',together)