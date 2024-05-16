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

// Create listing form listener
const setupCreateListingListener = () => {
    const createListingForm = document.getElementById('create-listing-form');
    createListingForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        // Get form data
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const price = document.getElementById('price').value;
        
        // Perform create listing logic
        // ...
    });
};

// Main setup function that initializes all listeners
const setupListeners = () => {
    setupLoginListener();
    setupSearchListener();
    setupRegisterListener();
    setupCreateListingListener();
};

export { setupListeners };