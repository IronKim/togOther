import { apiClient } from './ApiClient';

export const addTogether = (together) => apiClient.post('api/together/addTogether',together)

export const totTogether = () => apiClient.post('api/together/totTogether')

export const getTogetherList = (n) => apiClient.post('api/together/getTogetherList',n)
export const getSubItemList = () => apiClient.get('api/together/getSubItemList')
export const getCustomList = () => apiClient.get('api/together/getCustomList')