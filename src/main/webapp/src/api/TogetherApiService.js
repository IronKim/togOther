import { apiClient } from './ApiClient';

export const addTogether = (together) => apiClient.post('api/together/addTogether',together)

export const getTogetherList = () => apiClient.get('api/together/getTogetherList')
export const getSubItemList = () => apiClient.get('api/together/getSubItemList')
export const getCustomList = () => apiClient.get('api/together/getCustomList')