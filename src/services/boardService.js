const baseUrl = 'http://localhost:3030/jsonstore';

export function getAll() {
    return fetch(`${baseUrl}/boards?sortBy=_createdOn%20desc`)
        .then(res => res.json())
        .then(result => Object.values(result));
};

export function getOne(id) {

    return fetch(`${baseUrl}/boards/${id}`)
        .then(res => res.json())
        .then(res => Object.values(res));
};