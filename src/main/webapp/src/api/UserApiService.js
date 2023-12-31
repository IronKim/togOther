import { apiClient } from './ApiClient';

export const addUser = (user) => apiClient.post('api/user/addUser', user);

export const loginUser = (loginDTO) => apiClient.post('api/user/loginUser', loginDTO);

export const logoutUser = (refreshToken) => apiClient.get('api/user/logoutUser', { headers: { 'Refresh-Token': `${refreshToken}` }});

export const getUserByAccessToken = (accessToken) => apiClient.get('api/user/getUserByAccessToken', { headers: { Authorization: `${accessToken}` }});
  
export const getTokenByRefreshToken = (refreshToken) => apiClient.get('api/user/getTokenByRefreshToken', { headers: { 'Refresh-Token': `${refreshToken}` }});

export const certificationRequest = (requestBody) => apiClient.post('api/user/handleCertificationRequest', requestBody);

export const smsCertificationRequest = (userPhone) => apiClient.get(`api/user/smsCertificationRequest/${userPhone}`);

export const smsRequest = (userPhone) => apiClient.get(`api/user/smsRequest/${userPhone}`);

export const getUserByEmail = (userEmail) => apiClient.get(`api/user/getUserByEmail/${userEmail}`);

export const updateProfileText = (userSeq, profileText) => apiClient.put(`api/user/updateProfileText/${userSeq}`, {profileText});

export const updatePassword = (userSeq, password, updatePassword) => apiClient.put(`api/user/updatePassword/${userSeq}`, {password, updatePassword});

export const recoveryPassword = (userSeq, updatePassword) => apiClient.put(`api/user/recoveryPassword/${userSeq}`, { updatePassword});

export const updatePhone = (userSeq, updatePhone) => apiClient.put(`api/user/updatePhone/${userSeq}`, {updatePhone});

export const updateMbtiApi = (userSeq, mbti) => apiClient.put(`api/user/updateMbti/${userSeq}`, mbti);

export const updateLikingTrip = (userSeq, tripLiking) => apiClient.put(`api/user/updateLikingTrip/${userSeq}`, {tripLiking});

export const updateLikingFood = (userSeq, foodLiking) => apiClient.put(`api/user/updateLikingFood/${userSeq}`, {foodLiking});

export const updateLikingPlace = (userSeq, placeSeq) => apiClient.put(`api/user/updateLikingPlace/${userSeq}/${placeSeq}`);

export const updateProfileImage = (userSeq, profileImage) => apiClient.put(`api/user/updateProfileImage/${userSeq}`, {profileImage});

export const withdrawalUser = (userSeq) => apiClient.delete(`api/user/withdrawalUser/${userSeq}`);

export const isUserExistsByPhone = (phone) => apiClient.post(`api/user/isUserExistsByPhone`, {phone});

export const getUserByPhone = (phone) => apiClient.get(`api/user/getUserByPhone/${phone}`);

export const sendEmail = (email) => apiClient.get(`api/user/sendEmail/${email}`);

export const updatecityList = (userSeq, cityName) => apiClient.put(`api/user/updatecityList/${userSeq}`, {cityName});

export const naverLoginUser = (code, state) => apiClient.get(`api/user/naverLoginUser/${code}/${state}`);

export const getUserLikingPlace = (userSeq) => apiClient.get(`api/user/getUserLikingPlace/${userSeq}`);


