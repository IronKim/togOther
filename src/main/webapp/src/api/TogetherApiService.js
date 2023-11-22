import { apiClient } from './ApiClient';

export const addTogether = (together) => apiClient.post('api/together/addTogether',together)

export const totTogether = (n) => apiClient.post('api/together/totTogether',n)

export const getTogetherList = (n) => apiClient.post('api/together/getTogetherList',n)
export const getSubItemList = () => apiClient.get('api/together/getSubItemList')
export const getCustomList = () => apiClient.get('api/together/getCustomList')

export const getTogetherSeq = (togetherSeq) => apiClient.get(`api/together/getTogetherSeq/${togetherSeq}`)
export const getTogetherBySub = (togetherSeq) => apiClient.get(`api/together/getTogetherSeq/${togetherSeq}`)