import { apiClient } from './ApiClient';

export const getTourPackageList = () => apiClient.get(`/api/tourPackage/getTourPackageList`);

export const getTourPackageByCitySeq = (citySeq) => apiClient.get(`/api/tourPackage/getTourPackageByCitySeq/${citySeq}`);

export const getTourPackageByTpSeq = (tpSeq) => apiClient.get(`/api/tourPackage/getTourPackageByTpSeq/${tpSeq}`);