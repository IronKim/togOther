import { apiClient } from './ApiClient';

export const getTourPackageList = () => apiClient.get(`/api/tourPackage/getTourPackageList`);

export const getTourPackageByCitySeq = (citySeq) => apiClient.get(`/api/tourPackage/getTourPackageByCitySeq/${citySeq}`);

export const getTourPackageByTpSeq = (tpSeq) => apiClient.get(`/api/tourPackage/getTourPackageByTpSeq/${tpSeq}`);

export const getToken = (token) => apiClient.get(`/api/kakao/token/${token}`);

export const sendMessage = (message) => apiClient.post(`/api/kakao/send`,message);

export const addPayment = (packageDTO) => apiClient.post(`/api/tourPackage/addPayment`,packageDTO);

export const getPaymentBySeq = (seq) => apiClient.get(`/api/tourPackage/getPaymentBySeq/${seq}`);

export const getPaymentList = (seq) => apiClient.get(`/api/tourPackage/getPaymentList/${seq}`);

export const getPaymentAll = () => apiClient.get(`/api/tourPackage/getPaymentAll`);