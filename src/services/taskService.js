import * as api from './api';

const baseUrl = 'http://localhost:3030/data';

//const baseUrl = 'http://localhost:3030/jsonstore';

export const getAllTasks = (boardId) => api.get(`${baseUrl}/tasks?where=boardId%3D%22${boardId}%22`);

// export function getAllTasks() {
//     return fetch(`${baseUrl}/tasks`)
//         .then(res => res.json())
//         .then(result => Object.values(result));
// };
export const getTask = (id) => api.get(`${baseUrl}/tasks/${id}`);

/* export function getTask(taskId) {

    return fetch(`${baseUrl}/tasks/${taskId}`)
        .then(res => res.json())
        .then(res => Object.values(res));
}; */

export const updateTask = (id, status) => api.patch(`${baseUrl}/tasks/${id}`, { status });


// export const updateTask = (task) => {
//     return fetch(`${baseUrl}/tasks/${task._id}`, {
//         method: 'PUT',
//         headers: {
//             'content-type': 'application/json'
//         },
//         body: JSON.stringify(task)
//     })
//};