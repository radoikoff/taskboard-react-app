import * as api from './api';

const baseUrl = 'http://localhost:3030/data';


export const getAll = () => api.get(`${baseUrl}/boards?load=author%3D_ownerId%3Ausers&sortBy=_createdOn%20desc`);

export const getOne = (id) => api.get(`${baseUrl}/boards/${id}?load=author%3D_ownerId%3Ausers`);

export const create = (title, description) => api.post(`${baseUrl}/boards`, { title, description });

export const update = (id, title, description) => api.patch(`${baseUrl}/boards/${id}`, { title, description });

export const remove = (id) => api.del(`${baseUrl}/boards/${id}`);
