import { post } from "../apiBase.js";
import { getAuthHeaders } from "../headers.js";

const register = async (email, password) => {
    const response = await post('auth/register', { email, password });
    return response.json();
};

const login = async (email, password) => {
    const response = await post('auth/login', { email, password });
    const data = await response.json();
    if (data.token) {
        localStorage.setItem('token', data.token);
    }
    return data;
};

const createApiKey = async (token) => {
    const headers = getAuthHeaders(token, '');
    const response = await post('auth/create-api-key', {}, { headers });
    return response.json();
};

const isLoggedIn = () => {
    return !!localStorage.getItem('token');
};

const logout = () => {
    localStorage.removeItem('token');
};

export { register, login, logout, isLoggedIn, createApiKey };