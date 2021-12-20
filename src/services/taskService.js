import * as api from './api';

const baseUrl = 'http://localhost:3030/data';



export const getAllTasks = (boardId) => api.get(`${baseUrl}/tasks?where=boardId%3D%22${boardId}%22`);

export const getTask = (id) => api.get(`${baseUrl}/tasks/${id}`);

export const updateTaskStatus = (id, status) => api.patch(`${baseUrl}/tasks/${id}`, { status });

export const updateTask = (task) => api.patch(`${baseUrl}/tasks/${task._id}`, task);

export const deleteTask = (id) => api.del(`${baseUrl}/tasks/${id}`);
