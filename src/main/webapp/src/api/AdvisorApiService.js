import { apiClient } from './ApiClient';

export const getUser = () => apiClient.get('api/advisor/getUser');

export const getUserByColumn = (column, value) => apiClient.get(`/api/advisor/getUserByColumn/${column}/${value}`);

export const addCity = (city) => apiClient.post('api/advisor/addCity', city);

export const getCity = () => apiClient.get('/api/advisor/getCity');

export const updateCity = (citySeq, city) => apiClient.put(`/api/advisor/updateCity/${citySeq}`, city); 

export const addPlace = (place) => apiClient.post('/api/advisor/addPlace', place);

export const getPlaceByCitySeq = (citySeq) => apiClient.get(`/api/advisor/getPlaceByCitySeq/${citySeq}`);

export const updatePlace = (placeSeq, place) => apiClient.put(`/api/advisor/updatePlace/${placeSeq}`, place);

export const getPackageByCitySeq = (citySeq) => apiClient.get(`/api/advisor/getPackageByCitySeq/${citySeq}`);

export const addPackage = (tourPackage) => apiClient.put(`/api/advisor/addPackage`, tourPackage); 

export const updatePackage = (tourPackage) => apiClient.put(`/api/advisor/updatePackage`, tourPackage); 

export const addPackageDetail = (tourPackageDetail) => apiClient.put(`/api/advisor/addPackageDetail`, tourPackageDetail); 

export const updatePackageDetail = (tpdSeq) => apiClient.put(`/api/advisor/updatePackageDetail/${tpdSeq}`); 
