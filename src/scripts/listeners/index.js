import { login, register } from '../api/auth/auth.js';
import { searchListings } from '../api/auction/auction.js';
import { displayAllListings } from '../templates/allListings';

const setupLoginListener = () => {
    // Login form listener
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            
            // Get form data
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const response = await login(email, password);
                console.log('Login successful:', response);
            } catch (error) {
                console.error('Login failed:', error);
            }
        });
    }
};

const setupSearchListener = () => {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    if (searchInpit && searchButton) {
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

// Registration form listener
const registrationForm = document.getElementById('registrationForm');
registrationForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Perform registration logic
    // ...
});

// Create listing form listener
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

// Main setup function that initializes all listeners
const setupListeners = () => {
    setupLoginListener();
    setupSearchListener();
};

export { setupListeners };