import { displayAllListings } from '../templates/allListings';
import { setupRegisterListener } from './registerListener.js';
import { setupLoginListener } from './loginListener.js';

const setupSearchListener = () => {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    if (searchInput && searchButton) {
        searchButton.addEventListener('click', async () => {
            const query = searchInput.value;
            try {
                const listings = await searchListings(query);
                displayAllListings(listings);
            } catch (error) {
                console.error('Search failed:', error);
            }
        });
    }
};

// Main setup function that initializes all listeners
const setupListeners = () => {
    setupLoginListener();
    setupSearchListener();
    setupRegisterListener();
};

export { setupListeners };