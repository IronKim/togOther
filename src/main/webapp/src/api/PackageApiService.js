import { apiClient } from './ApiClient';

export const getTourPackgeList = () => apiClient.get('api/package/getTourPackgeList');

export const getTourPackageByCitySeq = (citySeq) => apiClient.get(`api/package/getTourPackageByCitySeq/${citySeq}`)

export const getTourDetailPackageByTpSeq = (tpSeq) => apiClient.get(`api/place/getTourDetailPackageByTpSeq/${tpSeq}`)