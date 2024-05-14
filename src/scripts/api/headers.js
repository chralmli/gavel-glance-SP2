import { getAccessToken } from './auth/auth.js';
import { API_KEY } from './constants.js';
function getAuthHeaders() {
    const token = getAccessToken();
    return {
        'Authorization': `Bearer ${token}`,
        'X-Api-Key': API_KEY,
        'Content-Type': 'application/json'
    };
}

export { getAuthHeaders };