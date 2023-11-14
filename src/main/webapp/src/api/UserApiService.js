import { apiClient } from './ApiClient';

export const addUser = (user) => apiClient.post('api/user/addUser', user);



