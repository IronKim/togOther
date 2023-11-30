import { apiClient } from './ApiClient';

export const getTourPackageList = () => apiClient.get(`/api/tourPackage/getTourPackageList`);

export const getTourPackageByCitySeq = (citySeq) => apiClient.get(`/api/tourPackage/getTourPackageByCitySeq/${citySeq}`);

export const getTourPackageByTpSeq = (tpSeq) => apiClient.get(`/api/tourPackage/getTourPackageByTpSeq/${tpSeq}`);

export const getToken = (token) => apiClient.get(`/api/kakao/token/${token}`);

export const sendMessage = (mes) => apiClient.post(`/api/kakao/send`,mes);