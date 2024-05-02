import { post } from "../apiBase.js";
import { getAuthHeaders } from "../headers.js";

const register = async (email, password) => {
    const response = await post('auth/register', { email, password });
    return response.json();
};

const login = async (email, password) => {
    const response = await post('auth/login', { email, password });
    return response.json();
};

const createApiKey = async (token) => {
    const headers = getAuthHeaders(token, '');
    const response = await post('auth/create-api-key', {}, { headers });
    return response.json();
};

export { register, login, createApiKey };