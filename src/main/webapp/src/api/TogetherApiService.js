import { apiClient } from './ApiClient';

export const addTogether = (together) => apiClient.post('api/together/addTogether',together)

export const totTogether = (n) => apiClient.post('api/together/totTogether',n)

export const getTogetherList = (n) => apiClient.post('api/together/getTogetherList',n)
export const getSubItemList = () => apiClient.get('api/together/getSubItemList')
export const getCustomList = () => apiClient.get('api/together/getCustomList')

export const getTogetherSeq = (togetherSeq) => apiClient.get(`api/together/getTogetherSeq/${togetherSeq}`)

export const deleteTogether = (togetherSeq) => apiClient.delete(`api/together/deleteTogether/${togetherSeq}`)
//
export const getMyTogether = (n) => apiClient.post('api/together/getMyTogetherList', n);
export const totMyTogether = (n) => apiClient.post('api/together/totMyTogether', n);
//
export const addSubscript = (dto) => apiClient.post('api/together/addSubscript', dto);
export const getChatSeq = (togetherSeq) => apiClient.get(`api/together/getChatSeq/${togetherSeq}`)
export const getAllSubscript = () => apiClient.get(`api/together/getAllSubscript`)
export const deleteSubscript = (subscriptSeq) => apiClient.delete(`api/together/deleteSubscript/${subscriptSeq}`)
//
export const entryRoom = (res) => apiClient.put(`chat/entryRoom`,res)
export const deleteRoom = (togetherSeq) => apiClient.delete(`chat/deleteRoom/${togetherSeq}`)

