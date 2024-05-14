import { getAuthHeaders } from "../headers.js";

const registerUser = async (email, password, name, profileImage) => {
    const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, name, profileImage }),
    });

    if (!response.ok) {
        throw new Error(`Failed to register user: ${response.status}`);
    }

    return response.json();
};

const loginUser = async (email, password) => {
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error(`Failed to login user: ${response.status}`);
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
    return data;
};

const logoutUser = () => {
    localStorage.removeItem('token');
};

const isLoggedIn = () => {
    return !!localStorage.getItem('token');
};

const getAccessToken = () => {
    return localStorage.getItem('token');
};

const updateUserAvatar = async (avatarUrl) => {
    const response = await fetch('/api/user/avatar', {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ avatarUrl }),
    });

    if (!response.ok) {
        throw new Error(`Failed to update user avatar: ${response.status}`);
    }

    return response.json();
};

const getUserCredits = async () => {
    const response = await fetch('/api/user/credits', {
        headers: getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error(`Failed to get user credits: ${response.status}`);
    }

    const data = await response.json();
    return data.credits;
}

// Create API key
const createApiKey = async () => {
    const token = localStorage.getItem('token');

    const response = await fetch('/api/user/api-key', {
        method: 'POST',
        headers: getAuthHeaders()
    });

    if (!response.ok) {
        throw new Error(`Failed to create API key: ${response.status}`);
    }

    const data = await response.json();
    return data.apiKey;
};


export { registerUser, loginUser, logoutUser, isLoggedIn, createApiKey, updateUserAvatar, getUserCredits, getAccessToken };