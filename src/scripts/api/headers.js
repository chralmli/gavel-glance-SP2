function getAuthHeaders(token, apiKey) {
    return {
        'Authorization': `Bearer ${token}`,
        'X-Api-Key': apiKey,
        'Content-Type': 'application/json'
    };
}

export { getAuthHeaders };