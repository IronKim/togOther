import { apiClient } from './ApiClient';

export const addUser = (user) => apiClient.post('api/user/addUser', user);

export const loginUser = (loginDTO) => apiClient.post('api/user/loginUser', loginDTO);

export const logoutUser = (refreshToken) => apiClient.get('api/user/logoutUser', { headers: { 'Refresh-Token': `${refreshToken}` }});

export const getUserByAccessToken = (accessToken) => apiClient.get('api/user/getUserByAccessToken', { headers: { Authorization: `${accessToken}` }});
  
export const getTokenByRefreshToken = (refreshToken) => apiClient.get('api/user/getTokenByRefreshToken', { headers: { 'Refresh-Token': `${refreshToken}` }});

export const certificationRequest = (requestBody) => apiClient.post('api/user/handleCertificationRequest', requestBody);

export const getUserByEmail = (userEmail) => apiClient.get(`api/user/getUserByEmail/${userEmail}`);



