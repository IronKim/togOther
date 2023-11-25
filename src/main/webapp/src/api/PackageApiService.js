import { apiClient } from './ApiClient';

export const getPackage = (tourPackage) => apiClient.get('api/package/getTourPackgeList', tourPackage);

export const getTourPackageByCitySeq = (citySeq) => apiClient.get(`api/package/getTourPackageByCitySeq/${citySeq}`)

export const getTourDetailPackageByTpSeq = (tpSeq) => apiClient.get(`api/packageDetail/getTourDetailPackageByTpSeq/${tpSeq}`)
