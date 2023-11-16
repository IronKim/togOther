import { apiClient } from './ApiClient';

export const addUser = (user) => apiClient.post('api/user/addUser', user);

export const certificationRequest = (requestBody) => apiClient.post('api/user/handleCertificationRequest', requestBody);

export const getUserByEmail = (userEmail) => apiClient.get(`api/user/getUserByEmail/${userEmail}`);



