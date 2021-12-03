const baseUrl = 'http://localhost:3030/jsonstore';

export function getAllTasks() {
    return fetch(`${baseUrl}/tasks`)
        .then(res => res.json())
        .then(result => Object.values(result));
};

export function getTask(taskId) {

    return fetch(`${baseUrl}/tasks/${taskId}`)
        .then(res => res.json())
        .then(res => Object.values(res));
};

export const updateTask = (task) => {
    return fetch(`${baseUrl}/tasks/${task._id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(task)
    })
};