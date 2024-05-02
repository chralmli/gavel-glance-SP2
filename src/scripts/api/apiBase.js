const API_BASE_URL = "https://v2.api.noroff.dev/";

function get(url, options = {}) {
    return fetch(API_BASE_URL + url, { ...options, method: "GET" });
}

function post(url, body, options = {}) {
    return fetch(API_BASE_URL + url, { ...options, method: "POST", body: JSON.stringify(body) });
}

function put(url, body, options = {}) {
    return fetch(API_BASE_URL + url, { ...options, method: "PUT", body: JSON.stringify(body) });
}

function del(url, options = {}) {
    return fetch(API_BASE_URL + url, { ...options, method: "DELETE" });
}

export { get, post, put, del };