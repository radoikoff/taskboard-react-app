import * as api from './api';

const baseUrl = 'http://localhost:3030/data';



export const getAllTasks = (boardId) => api.get(`${baseUrl}/tasks?where=boardId%3D%22${boardId}%22&load=author%3D_ownerId%3Ausers`);

export const getTask = (id) => api.get(`${baseUrl}/tasks/${id}?load=author%3D_ownerId%3Ausers`);

export const updateTaskStatus = (id, status) => api.patch(`${baseUrl}/tasks/${id}`, { status });

export const updateTask = (task) => api.patch(`${baseUrl}/tasks/${task._id}`, task);

export const deleteTask = (id) => api.del(`${baseUrl}/tasks/${id}`);

export const createTask = (taskData) => api.post(`${baseUrl}/tasks`, taskData);

export const getTaskStatuses = () => api.get(`${baseUrl}/taskStatuses`);

export const getTasksCount = (boardId) => api.get(`${baseUrl}/tasks?where=boardId%3D%22${boardId}%22&count`);



