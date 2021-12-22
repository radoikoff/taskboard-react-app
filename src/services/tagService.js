import * as api from './api';

const baseUrl = 'http://localhost:3030/data';


export const getAllTags = () => api.get(`${baseUrl}/tags`);
