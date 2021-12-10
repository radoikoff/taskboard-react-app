const baseUrl = 'http://localhost:3030/data';

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

export const create = (title, description, token) => {
    return fetch(`${baseUrl}/boards`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': token
        },
        body: JSON.stringify({ title, description })
    })
        .then(res => res.json());
}