import { apiClient } from './ApiClient';

export const addUser = (user) => apiClient.post('api/user/addUser', user);

export const loginUser = (loginDTO) => apiClient.post('api/user/loginUser', loginDTO);

export const logoutUser = (refreshToken) => apiClient.get('api/user/logoutUser', { headers: { 'Refresh-Token': `${refreshToken}` }});

export const getUserByAccessToken = (accessToken) => apiClient.get('api/user/getUserByAccessToken', { headers: { Authorization: `${accessToken}` }});
  
export const getTokenByRefreshToken = (refreshToken) => apiClient.get('api/user/getTokenByRefreshToken', { headers: { 'Refresh-Token': `${refreshToken}` }});

export const certificationRequest = (requestBody) => apiClient.post('api/user/handleCertificationRequest', requestBody);

export const smsCertificationRequest = (userPhone) => apiClient.get(`api/user/smsCertificationRequest/${userPhone}`);

export const getUserByEmail = (userEmail) => apiClient.get(`api/user/getUserByEmail/${userEmail}`);

export const updateProfileText = (userSeq, profileText) => apiClient.put(`api/user/updateProfileText/${userSeq}`, {profileText});

export const updatePassword = (userSeq, password, updatePassword) => apiClient.put(`api/user/updatePassword/${userSeq}`, {password, updatePassword});

export const updatePhone = (userSeq, updatePhone) => apiClient.put(`api/user/updatePhone/${userSeq}`, {updatePhone});

export const withdrawalUser = (userSeq) => apiClient.delete(`api/user/withdrawalUser/${userSeq}`);


