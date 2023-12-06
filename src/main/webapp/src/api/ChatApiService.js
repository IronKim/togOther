import { apiClient } from './ApiClient';

export const createRoom = (createRoom) => apiClient.post('/chat/createRoom',createRoom);

export const updateRoom = (updateRoom) => apiClient.put('/chat/updateRoom',updateRoom);

export const deleteRoom = (deleteRoom) => apiClient.delete('/chat/deleteRoom',deleteRoom);
