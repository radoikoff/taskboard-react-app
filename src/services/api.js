const request = (url, options) => {
    return fetch(url, options)
        .then(responseHandler)
        .catch((err) => console.log(err));
};

async function responseHandler(res) {
    let jsonData = await res.json();

    if (res.ok) {
        return Object.values(jsonData);
    } else {
        throw jsonData;
    }
}

function getOptions(method = 'get', body) {
    const options = {
        method,
        headers: {}
    };

    const user = getUserData();
    if (user) {
        options.headers['X-Authorization'] = user.accessToken;
    }

    if (body) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(body);
    }

    return options;
}

function getUserData() {
    const user = localStorage.getItem('user');
    if (user) {
        return JSON.parse(user);
    } else {
        return undefined;
    }
}

export const get = (url) => {
    return request(url, getOptions());
}

export const post = (url, body) => {
    return request(url, getOptions('post', body));
}

export const del = (url) => {
    return request(url, getOptions('delete'));
}


