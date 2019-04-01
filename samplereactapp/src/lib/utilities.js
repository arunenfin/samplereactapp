const { REACT_APP_API_URL } = process.env;


function fetchPost(params) {
    const TOKEN = localStorage.getItem('token');
    let headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    };
    if(TOKEN) { headers.Authorization = `Bearer ${TOKEN}` }
    
    return fetch(params.url, {
        method: 'POST',
        headers,
        body: JSON.stringify(params.data),
    })
    .then(result => result.json());
}

function fetchPut(params) {
    const TOKEN = localStorage.getItem('token');
    let headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    };
    if(TOKEN) { headers.Authorization = `Bearer ${TOKEN}` }
    
    return fetch(params.url, {
        method: 'PUT',
        headers,
        body: JSON.stringify(params.data),
    })
    .then(result => result.json());
}

function fetchGet(params) {
    const TOKEN = localStorage.getItem('token');
    let headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    };
    if(TOKEN) { headers.Authorization = `Bearer ${TOKEN}` }

    return fetch(params.url, {
        method: 'GET',
        headers
    })
    .then(result => result.json());
}

export const authenticate = (data) => {
    return fetchPost({ url: REACT_APP_API_URL, data });
}

export const getUsers = () => {
    return fetchGet({ url: `${REACT_APP_API_URL}/users` })
}

export const updateUser = (data) => {
    return fetchPut({ url: `${REACT_APP_API_URL}/users`, data })
}