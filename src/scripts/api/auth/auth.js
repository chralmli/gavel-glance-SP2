import { post } from '../apiBase.js';
import { getAuthHeaders } from "../headers.js";

const registerUser = async (name, email, password, bio, avatar, venueManager) => {
    const payload = {
        name,
        email,
        password,
        bio: bio || '',
        venueManager: venueManager || false,
    };

    if (avatar) {
        payload.avatar = avatar;
    }

    console.log("Payload being sent:", payload);
    
    const response = await post('auth/register', payload, {
        headers: {
            'Content-Type': 'application/json'
        },
    });

    const data = await response.json();
    console.log("Server response:", data);

    if(response.status !== 201) {
        const errorMessage = data.message || data.errors?.[0]?.message || 'Unknown error';
        throw new Error(`Failed to register user: ${response.status} - ${errorMessage}`)
    }

    return data;
};

const loginUser = async (email, password) => {
    const response = await post('auth/login', { email, password }, {
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();

    if (!response.ok) {
        const errorMessage = data.message || data.errors?.[0]?.message || 'Unknown error';
        throw new Error(`Failed to login user: ${response.status} - ${errorMessage}`);
    }

    if (data && data.data && data.data.accessToken) {
        localStorage.setItem('token', data.data.accessToken);
        localStorage.setItem('username', data.data.user.name);
    } else {
        throw new Error('No accessToken received from login response');
    }

    return data;
};

const logoutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
};

const isLoggedIn = () => {
    return !!localStorage.getItem('token');
};

const getAccessToken = () => {
    return localStorage.getItem('token');
};

// Get user profile
const getUserProfile = async () => {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    const response = await fetch(`auction/profiles/${username}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    });
    if (!response.ok) {
        throw new Error(`Failed to get user profile: ${response.status}`);
    }
    const data = await response.json();
    return data.data;
}

// Update user profile
const updateUserProfile = async (profileUpdates) => {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    const response = await fetch(`auction/profiles/${username}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileUpdates)
    });
    if (!response.ok) {
        throw new Error(`Failed to update user profile: ${response.status}`);
    }
    return response.json();
}

// Get user credits
const getUserCredits = async () => {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    const response = await fetch(`auction/profiles/${username}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
    if (!response.ok) {
        throw new Error(`Failed to get user credits: ${response.status}`);
    }
    const data = await response.json();
    return data.data.credits;
}

// // Update user credits
// const updateCredits = async (amount) => {
//     const username = localStorage.getItem('username');
//     const token = localStorage.getItem('token');
//     const response = await fetch(`auction/profiles/${username}`, {
//         method: 'PUT',
//         headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ amount: amount })
//     });
//     if (!response.ok) {
//         throw new Error(`Failed to update user credits: ${response.status}`);
//     }
//     return response.json();
// };

// Create API key
const createApiKey = async () => {
    const token = getAccessToken();

    const response = await post('auth/create-api-key', {}, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();

    if (!response.ok) {
        const errorMessage = data.message || data.errors?.[0]?.message || 'Unknown error';
        throw new Error(`Failed to create API key: ${response.status} - ${errorMessage}`);
    }

    return data.data.key;
};


export { registerUser, loginUser, logoutUser, isLoggedIn, createApiKey, getUserProfile, updateUserProfile, getUserCredits, getAccessToken };